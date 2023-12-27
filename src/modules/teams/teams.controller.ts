import {
  Body,
  Controller,
  Delete, Get,
  HttpStatus,
  Param,
  Post, Put,
  Res
} from '@nestjs/common';
import {TeamsService} from "./teams.service";
import {ChangeTeamDto, CreateTeamDto} from "./teams.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("Teams")
@Controller('api/teams')
export class TeamsController {
  constructor(
    private teamService: TeamsService
  ) {}

  @Put()
  async createTeam(@Res() response, @Body() createTeamDto: CreateTeamDto) {
    const team = await this.teamService.createTeam(createTeamDto);
    return response.status(HttpStatus.CREATED).json({team});
  }

  @Get("/:id")
  async testMethod(@Res() response, @Param('id') teamId: string) {
    return response.status(HttpStatus.OK).json({
      team: await this.teamService.getTeam(+teamId)
    });
  }

  @Post()
  async changeTeam(@Res() response, @Body() changeTeamDto: ChangeTeamDto) {
    const team = await this.teamService.changeTeam(changeTeamDto);
    return response.status(HttpStatus.OK).json({team});
  }

  @Delete("/:id")
  async deleteTeam(@Res() response, @Param('id') teamId: string) {
    try {
      await this.teamService.deleteTeam(+teamId);
      return response.status(HttpStatus.OK);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
