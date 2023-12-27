export class CreateTeamDto {
  readonly name: string;
  readonly adminId: number;
  readonly picture?: string;
}

export class ChangeTeamDto {
  readonly id: number;
  readonly name: string;
  readonly adminId: number;
  readonly picture?: string;
}

export class CreateTeamMemberDto {
  readonly teamId: number;
  readonly userId: number;
}
