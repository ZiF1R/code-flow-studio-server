import {User} from "../../models/user.model";

export interface CreateUserDto {
  readonly accessToken: string;
  readonly githubAccessToken?: string;
  readonly refreshToken?: string;
  readonly email: string;
  readonly name?: string;
  readonly surname?: string;
  readonly username?: string;
  readonly picture?: string;
}

export interface GithubAccess {
  readonly email: string;
  readonly githubAccessToken: string;
}

export interface AuthPayload {
  user: User;
  token: string;
}

export type TokensPair = {
  accessToken: string;
  refreshToken: string;
}
