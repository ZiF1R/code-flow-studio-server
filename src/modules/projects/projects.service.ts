import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException
} from "@nestjs/common";
import { DockerService } from "./services/docker.service";
import {Project} from "../../models/project.model";
import {CreateProjectDataDto, CreateProjectDto} from "./projects.dto";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class ProjectsService {
  constructor(
    private dockerService: DockerService,
    @InjectModel(Project)
    private projectModel: typeof Project
  ) {}

  async createProject(projectData: CreateProjectDataDto): Promise<Project> {
    const fsProject = await this.dockerService.initProject(projectData);
    console.log(fsProject, projectData);
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
    const project = (await this.projectModel.findAll({
      where: {
        userId
      }
    }))[0];

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
}
