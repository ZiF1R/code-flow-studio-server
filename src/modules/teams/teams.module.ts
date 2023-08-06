import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Team } from "../../models/team.model";
import { TeamMember } from "../../models/team-member";

@Module({
  controllers: [TeamsController],
  providers: [TeamsService],
  imports: [
    SequelizeModule.forFeature([Team, TeamMember]),
  ]
})
export class TeamsModule {}
