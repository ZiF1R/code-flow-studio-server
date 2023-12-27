import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Team } from "../../models/team.model";
import { TeamMember } from "../../models/team-member.model";
import {TeamMembersService} from "./team-members/team-members.service";
import {Invitation} from "../../models/invitation.model";

@Module({
  controllers: [TeamsController],
  providers: [TeamsService, TeamMembersService],
  imports: [
    SequelizeModule.forFeature([Team, TeamMember]),
  ]
})
export class TeamsModule {}
