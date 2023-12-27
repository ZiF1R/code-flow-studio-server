import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import {Invitation} from "../../../models/invitation.model";
import {CreateInvitationDto, InvitationAnswerDto} from "./invitations.dto";

@Injectable()
export class InvitationsService {
  constructor(
    @InjectModel(Invitation)
    private invitationModel: typeof Invitation
  ) {}

  async createInvitation(data: CreateInvitationDto): Promise<Invitation> {
    const [invitation] = await this.invitationModel.findOrCreate({
      where: {...data},
      defaults: {
        accepted: false
      }
    });
    return invitation;
  }

  async answerInvitation(invitationId: number, answer: InvitationAnswerDto): Promise<Invitation> {
    const invitation = await this.invitationModel.findByPk(invitationId);
    invitation.accepted = answer.accepted;
    await invitation.save();

    return invitation;
  }
}
