import { Controller, Get, Post, Req, Request } from "@nestjs/common";
import { ProjectsService } from "./projects.service";

@Controller('api/projects')
export class ProjectsController {
  constructor(
    private projectService: ProjectsService
  ) {}

  @Get("/create")
  async createProject(@Req() req: Request) {
    /**
     * from request:
     * app type (node, go, python, php, static, ruby, rust)
     */
    return await this.projectService.createProject();
  }
}
