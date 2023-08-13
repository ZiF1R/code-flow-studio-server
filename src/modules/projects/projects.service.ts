import { Injectable } from "@nestjs/common";
import { DockerService } from "./services/docker.service";

@Injectable()
export class ProjectsService {
  constructor(
    private dockerService: DockerService
  ) {}

  async createProject() {
    const templateLink = 'https://github.com/codesandbox/static-template';
    return await this.dockerService.initProject(templateLink);
  }
}
