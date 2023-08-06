import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Team } from "../../models/team.model";
import { CreateTeamDto, CreateTeamMemberDto } from "./teams.dto";
import { TeamMember } from "../../models/team-member";

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team)
    private teamModel: typeof Team,
    @InjectModel(TeamMember)
    private teamMemberModel: typeof TeamMember,
  ) {}

  async createTeam(data: CreateTeamDto) {
    const team = await this.teamModel.create(data);
    await this.insertTeamMember({
      teamId: team.id,
      userId: data.adminId
    });
    return team;
  }

  async insertTeamMember(data: CreateTeamMemberDto) {
    return await this.teamMemberModel.create(data);
  }
}
