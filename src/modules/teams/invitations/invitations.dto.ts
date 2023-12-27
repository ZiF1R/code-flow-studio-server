export class CreateInvitationDto {
  readonly teamId: number;
  readonly fromUserId: number;
  readonly toUserId: number;
}

export class InvitationAnswerDto {
  readonly accepted: boolean;
}
