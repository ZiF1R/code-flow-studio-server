export class CreateUserDto {
  readonly email: string;
  readonly name?: string;
  readonly surname?: string;
  readonly avatar_link?: string;
}
