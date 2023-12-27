import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import {Invitation} from "../../../models/invitation.model";
import {InvitationsService} from "./invitations.service";
import {InvitationsController} from "./invitations.controller";

@Module({
  controllers: [InvitationsController],
  providers: [InvitationsService],
  imports: [
    SequelizeModule.forFeature([Invitation]),
  ]
})
export class InvitationsModule {}
