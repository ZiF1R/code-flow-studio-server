import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Req,
  Request, Res
} from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import {ApiTags} from "@nestjs/swagger";
import {CreateProjectDataDto} from "./projects.dto";

@ApiTags("Projects")
@Controller('api/projects')
export class ProjectsController {
  constructor(
    private projectService: ProjectsService
  ) {}

  @Put()
  async createProject(@Res() response, @Body() data: CreateProjectDataDto) {
    const project = await this.projectService.createProject(data);
    return response.status(HttpStatus.OK).json({project});
  }

  @Get()
  async getProjects(@Res() response) {
    const projects = await this.projectService.getUserProjects();
    return response.status(HttpStatus.OK).json({projects});
  }
}
