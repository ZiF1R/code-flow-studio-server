import {
  Body,
  Controller,
  Delete,
  HttpStatus, Param,
  Post,
  Put,
  Res
} from '@nestjs/common';
import {TeamMembersService} from "./team-members.service";
import {CreateTeamMemberDto} from "../teams.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("TeamMembers")
@Controller('api/team-members')
export class TeamMembersController {
  constructor(
    private teamMemberService: TeamMembersService
  ) {}

  @Put()
  async createMember(@Res() response, @Body() createTeamMemberDto: CreateTeamMemberDto) {
    const member = await this.teamMemberService.insertTeamMember(createTeamMemberDto);
    return response.status(HttpStatus.OK).json({member});
  }

  @Delete("/:id")
  async deleteMember(@Res() response, @Param() memberId: string) {
    try {
      await this.teamMemberService.deleteMember(+memberId);
      return response.status(HttpStatus.OK);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
