export class CreateUserDto {
  readonly accessToken: string;
  readonly githubAccessToken?: string;
  readonly refreshToken?: string;
  readonly email: string;
  readonly name?: string;
  readonly surname?: string;
  readonly username?: string;
  readonly picture?: string;
}

export class GithubAccess {
  readonly email: string;
  readonly githubAccessToken: string;
}
