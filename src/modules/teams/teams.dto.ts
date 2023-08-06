export class CreateTeamDto {
  readonly name: string | 'Personal';
  readonly adminId: number;
  readonly picture?: string;
}

export class CreateTeamMemberDto {
  readonly teamId: number;
  readonly userId: number;
}
