import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post, Put,
  Res
} from '@nestjs/common';
import {InvitationsService} from "./invitations.service";
import {CreateInvitationDto, InvitationAnswerDto} from "./invitations.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("Invitations")
@Controller('api/invitations')
export class InvitationsController {
  constructor(
    private invitationService: InvitationsService
  ) {}

  @Put()
  async createInvitation(@Res() response, @Body() createInvitationDto: CreateInvitationDto) {
    const invitation = await this.invitationService.createInvitation(createInvitationDto);
    return response.status(HttpStatus.CREATED).json({invitation});
  }

  @Post("/:id")
  async answerToInvitation(@Res() response, @Param('id') invitationId: string, @Body() invitationAnswerDto: InvitationAnswerDto) {
    const invitation = await this.invitationService.answerInvitation(+invitationId, invitationAnswerDto);
    return response.status(HttpStatus.OK).json({invitation});
  }
}
