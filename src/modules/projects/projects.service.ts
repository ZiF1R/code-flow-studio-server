import { Injectable } from "@nestjs/common";
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
    const templateLink = 'https://github.com/codesandbox/static-template';
    const fsProject = await this.dockerService.initProject(templateLink);
    return await this.projectModel.create({
      userId: projectData.userId,
      teamId: projectData?.teamId || null,
      name: projectData.name || fsProject.name,
      codeName: fsProject.name,
      template: false,
      public: projectData.public,
      freezed: false,
    });
  }

  async getUserProjects() {
    // TODO: check auth token with middleware
    const userId = 1;
    return await this.projectModel.findAll({
      where: {
        userId
      }
    })
  }

  // TODO:
  async getUserRecentProjects() {

  }

  // TODO: project delete method
  async deleteTeamProjects(teamId: number) {
    // await
  }
}
