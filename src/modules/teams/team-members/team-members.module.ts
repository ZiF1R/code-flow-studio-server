import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {TeamMember} from "../../../models/team-member.model";
import {TeamMembersController} from "./team-members.controller";
import {TeamMembersService} from "./team-members.service";

@Module({
  controllers: [TeamMembersController],
  providers: [TeamMembersService],
  imports: [
    SequelizeModule.forFeature([TeamMember]),
  ]
})
export class TeamMembersModule {}
