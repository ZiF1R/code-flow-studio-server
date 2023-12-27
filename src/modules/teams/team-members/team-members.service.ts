import { Injectable } from '@nestjs/common';
import {CreateTeamMemberDto} from "../teams.dto";
import {InjectModel} from "@nestjs/sequelize";
import {TeamMember} from "../../../models/team-member.model";

@Injectable()
export class TeamMembersService {
  constructor(
    @InjectModel(TeamMember)
    private teamMemberModel: typeof TeamMember,
  ) {}

  async insertTeamMember(data: CreateTeamMemberDto): Promise<TeamMember> {
    return await this.teamMemberModel.create(data);
  }

  async deleteTeamMembers(teamId: number): Promise<void> {
    await this.teamMemberModel.destroy({
      where: {
        teamId
      }
    })
  }

  async deleteMember(id: number): Promise<void> {
    await this.teamMemberModel.destroy({
      where: {
        id
      }
    });
  }
}
