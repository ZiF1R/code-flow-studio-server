import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException
} from "@nestjs/common";
import { DockerService } from "./services/docker.service";
import {Project} from "../../models/project.model";
import {
  CreateProjectDataDto,
  CreateProjectDto,
  VisitProjectDto
} from "./projects.dto";
import {InjectModel} from "@nestjs/sequelize";
import {FsService} from "./services/fs.service";
import {User} from "../../models/user.model";
import {
  FileMap, ProjectFile,
  ProjectRoom,
  ProjectRoomUser
} from "./websockets/events.interface";
import {VisitedProject} from "../../models/visited-project.model";

@Injectable()
export class ProjectsService {
  constructor(
    private dockerService: DockerService,
    @InjectModel(Project)
    private projectModel: typeof Project,
    @InjectModel(VisitedProject)
    private visitedProjectModel: typeof VisitedProject,
    private fsService: FsService,
  ) {}

  private projectsRooms: ProjectRoom[] = []

  async createProject(projectData: CreateProjectDataDto): Promise<Project> {
    // await this.dockerService.initProject(projectData);
    const fsProject = await this.fsService.generateProject(projectData);
    return await this.projectModel.create({
      userId: projectData.userId,
      teamId: projectData?.teamId || null,
      folderId: null,
      name: projectData.name || fsProject.name,
      description: null,
      codeName: fsProject.name,
      template: false,
      public: projectData.public,
      freezed: false,
    });
  }

  async getUserProjects(userId: number): Promise<Project[]> {
    // TODO: check auth token with middleware
    // https://docs.nestjs.com/security/authentication#implementing-the-authentication-guard
    return await this.projectModel.findAll({
      where: {
        userId
      }
    })
  }

  async getProject(codeName: string, userId: number): Promise<Project> {
    const project = await this.projectModel.findOne({
      where: {
        codeName
      }
    });

    if (project.public) {
      return project;
    } else if (userId === project.userId) {
      return project;
    } else {
      throw new NotAcceptableException();
    }
  }

  async getUserRecentProjects(userId: number, page: number = 1): Promise<Project[]> {
    const pageCapacity = 8;
    return await this.projectModel.findAll({
      where: {
        userId,
      },
      order: [
        ['updatedAt', 'DESC']
      ],
      limit: pageCapacity,
      offset: (page - 1) * pageCapacity
    });
  }

  // TODO: project delete method
  async deleteTeamProjects(teamId: number) {
    // await
  }

  async addRoom(codeName: string, user: ProjectRoomUser): Promise<void> {
    const project = await this.projectModel.findOne({
      where: {
        codeName
      }
    });
    this.projectsRooms.push({
      project,
      users: [user]
    })
  }

  async removeProjectRoom(codeName: string): Promise<void> {
    const findRoom = await this.getProjectRoomIndex(codeName)
    if (findRoom !== null) {
      this.projectsRooms = this.projectsRooms.filter((room) => room.project.codeName !== codeName)
    }
  }

  async getProjectRoomIndex(codeName: string): Promise<number> | null {
    const projectRoom = this.projectsRooms.findIndex(room => room.project?.codeName === codeName);

    if (projectRoom === -1) {
      return null;
    } else {
      return projectRoom;
    }
  }

  getProjectRoom(codeName: string): ProjectRoom | null {
    const projectRoom = this.projectsRooms.findIndex(room => room.project?.codeName === codeName);

    if (projectRoom === -1) {
      return null;
    } else {
      return this.projectsRooms[projectRoom];
    }
  }

  isProjectRoomContainsUser(room: ProjectRoom, user: ProjectRoomUser) {
    return room.users.filter(usr => usr.id === user.id).length > 0;
  }

  async addUserToProject(codeName: string, user: User, socket: string): Promise<void> {
    const projectRoomIndex = await this.getProjectRoomIndex(codeName);
    const roomUser = {
      ...user,
      socket
    }
    if (projectRoomIndex !== null) {
      if (!this.isProjectRoomContainsUser(this.projectsRooms[projectRoomIndex], roomUser)) {
        this.projectsRooms[projectRoomIndex].users.push(roomUser);
      }
    } else {
      await this.addRoom(codeName, roomUser);
    }
  }

  async getRoomByUser(socket: string): Promise<ProjectRoom> {
    const room = this.projectsRooms.find(room => room.users.filter(user => user.socket === socket).length > 0);
    if (room) {
      return room;
    } else {
      return null;
    }
  }

  async removeUserFromRoom(socket: string): Promise<{ projectName: string, user: ProjectRoomUser } | null> {
    const room = await this.getRoomByUser(socket);
    let targetUser = null;
    if (room) {
      room.users = room.users.filter((user) => {
        if (user.socket !== socket) {
          return user;
        } else {
          targetUser = user;
        }
      });
      if (room.users.length === 0) {
        await this.removeProjectRoom(room.project.codeName);
      }
      return {
        projectName: room.project.codeName,
        user: targetUser
      }
    }
    return null;
  }

  getProjectsRooms(): ProjectRoom[] {
    return this.projectsRooms;
  }

  async getProjectTree(codeName: string): Promise<FileMap> {
    const tree = await this.fsService.getFilesTree(codeName);
    this.fsService.startId = 0;
    return tree;
  }

  async createProjectFile(projectName: string, data: ProjectFile): Promise<boolean> {
    return await this.fsService.createFile(projectName, data);
  }

  async getFileContent(projectName: string, path: string): Promise<string> {
    return await this.fsService.getFileContent(projectName, path);
  }

  async updateProjectVisit(data: VisitProjectDto) {
    const [projectVisit, created] = await this.visitedProjectModel.findOrCreate({
      where: {
        userId: data.userId,
        projectId: data.projectId,
      },
      defaults: data
    });

    if (!created) {
      projectVisit.timeStamp = data.timeStamp;
      await projectVisit.save();
    }
  }
}
