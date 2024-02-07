import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException
} from "@nestjs/common";
import { DockerService } from "./services/docker.service";
import {Project} from "../../models/project.model";
import {CreateProjectDataDto, CreateProjectDto} from "./projects.dto";
import {InjectModel} from "@nestjs/sequelize";
import {FsService} from "./services/fs.service";
import {User} from "../../models/user.model";
import {ProjectRoom} from "./events.interface";

@Injectable()
export class ProjectsService {
  constructor(
    private dockerService: DockerService,
    @InjectModel(Project)
    private projectModel: typeof Project,
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

  async addRoom(codeName: string, user: User): Promise<void> {
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
    const findRoom = await this.getProjectRoom(codeName)
    if (findRoom !== null) {
      this.projectsRooms = this.projectsRooms.filter((room) => room.project.codeName !== codeName)
    }
  }

  async getProjectRoom(codeName: string): Promise<number> | null {
    const projectRoom = this.projectsRooms.findIndex(room => room.project?.codeName === codeName);

    if (projectRoom === -1) {
      return null;
    } else {
      return projectRoom;
    }
  }

  isProjectRoomContainsUser(room: ProjectRoom, user: User) {
    return room.users.filter(usr => usr.id === user.id).length > 0;
  }

  async addUserToProject(codeName: string, user: User): Promise<void> {
    const projectRoomIndex = await this.getProjectRoom(codeName);
    if (projectRoomIndex !== null) {
      if (!this.isProjectRoomContainsUser(this.projectsRooms[projectRoomIndex], user)) {
        this.projectsRooms[projectRoomIndex].users.push(user);
      }
    } else {
      await this.addRoom(codeName, user);
    }
  }

  async getRoomByUser(email: string): Promise<ProjectRoom> {
    const room = this.projectsRooms.find(room => room.users.filter(user => user.email === email).length > 0);
    if (room) {
      return room;
    } else {
      return null;
    }
  }

  async removeUserFromRoom(email: string): Promise<void> {
    const room = await this.getRoomByUser(email);
    if (room) {
      room.users = room.users.filter((user) => user.email !== email);
      if (room.users.length === 0) {
        await this.removeProjectRoom(room.project.codeName);
      }
    }
  }

  getProjectsRooms(): ProjectRoom[] {
    return this.projectsRooms;
  }
}
