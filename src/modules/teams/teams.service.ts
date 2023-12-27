import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Team} from "../../models/team.model";
import {ChangeTeamDto, CreateTeamDto} from "./teams.dto";
import {TeamMember} from "../../models/team-member.model";
import {TeamMembersService} from "./team-members/team-members.service";

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team)
    private teamModel: typeof Team,
    @InjectModel(TeamMember)
    private teamMemberModel: typeof TeamMember,
    private teamMembersService: TeamMembersService
  ) {}

  async createTeam(data: CreateTeamDto): Promise<Team> {
    const team = await this.teamModel.create(data);
    await this.teamMembersService.insertTeamMember({
      teamId: team.id,
      userId: data.adminId
    });
    return team;
  }

  async changeTeam(data: ChangeTeamDto): Promise<Team> {
    const team = await this.teamModel.findByPk(data.id);
    team.name = data.name;
    team.adminId = data.adminId;
    team.picture = data.picture;
    await team.save();

    return team;
  }

  async getTeam(teamId: number): Promise<Team> {
    return await this.teamModel.findByPk(teamId);
  }

  async deleteTeam(id: number): Promise<void> {
    // TODO: call delete methods for other related tables

    await this.teamMembersService.deleteTeamMembers(id);
    await this.teamModel.destroy({
      where: {
        id
      }
    });
  }
}
