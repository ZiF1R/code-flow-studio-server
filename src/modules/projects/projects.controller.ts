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
import {CreateProjectDataDto, VisitProjectDto} from "./projects.dto";
import {ProjectRoom} from "./websockets/events.interface";

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
      const filesTree = await this.projectService.getProjectTree(codeName);
      return response.status(HttpStatus.OK).json({project, filesTree});
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
    const roomIndex = await this.projectService.getProjectRoomIndex(roomName);
    const room = this.projectService.getProjectsRooms()[roomIndex];
    return response.status(HttpStatus.OK).json({room});
  }

  @Get('/files')
  async getProjectFile(@Res() response, @Query('projectName') projectName: string, @Query('path') path: string) {
    const fileContent = await this.projectService.getFileContent(projectName, path);
    return response.status(HttpStatus.OK).json({content: fileContent});
  }

  @Post('/visited')
  async updateProjectVisit(@Res() response, @Body() data: VisitProjectDto) {
    await this.projectService.updateProjectVisit(data);
    return response.status(HttpStatus.OK).json({});
  }
}
