import {
  Body,
  Controller,
  Get,
  HttpStatus, Param,
  Post,
  Put, Query,
  Req,
  Request, Res
} from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import {ApiTags} from "@nestjs/swagger";
import {CreateProjectDataDto} from "./projects.dto";
import {ProjectRoom} from "./events.interface";

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
  async getProjects(@Res() response, @Query('userId') userId) {
    const projects = await this.projectService.getUserProjects(+userId);
    return response.status(HttpStatus.OK).json({projects});
  }

  @Get("/code-names/:projectCodeName")
  async getProject(@Res() response, @Param('projectCodeName') codeName: string, @Query('userId') userId) {
    try {
      const project = await this.projectService.getProject(codeName, +userId);
      return response.status(HttpStatus.OK).json({project});
    } catch (e) {
      return response.status(HttpStatus.NOT_ACCEPTABLE).json({});
    }
  }

  @Get('/recent')
  async getRecentProjects(@Res() response, @Query('userId') userId: string, @Query('page') page: string) {
    const projects = await this.projectService.getUserRecentProjects(+userId, +page);
    return response.status(HttpStatus.OK).json({projects});
  }

  @Get('/rooms/:roomName')
  async getRoom(@Res() response, @Param('roomName') roomName: string): Promise<ProjectRoom> {
    const roomIndex = await this.projectService.getProjectRoom(roomName);
    const room = this.projectService.getProjectsRooms()[roomIndex];
    return response.status(HttpStatus.OK).json({room});
  }
}
