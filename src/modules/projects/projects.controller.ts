import {Body, Controller, Get, Post, Put, Req, Request} from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import {CreateTeamDto} from "../teams/teams.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("Projects")
@Controller('api/projects')
export class ProjectsController {
  constructor(
    private projectService: ProjectsService
  ) {}

  @Put()
  async createProject(@Body() createTeamDto: CreateTeamDto) {
    /**
     * from request:
     * app type (node, go, python, php, static, ruby, rust)
     */
    return await this.projectService.createProject();
  }
}
