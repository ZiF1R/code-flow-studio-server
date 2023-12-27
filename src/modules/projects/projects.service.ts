import { Injectable } from "@nestjs/common";
import { DockerService } from "./services/docker.service";

@Injectable()
export class ProjectsService {
  constructor(
    private dockerService: DockerService,
    // private projectModel: Projec
  ) {}

  async createProject() {
    const templateLink = 'https://github.com/codesandbox/static-template';
    return await this.dockerService.initProject(templateLink);
  }

  // TODO: project delete method
  async deleteTeamProjects(teamId: number) {
    // await
  }
}
