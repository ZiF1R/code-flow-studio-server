import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Strategy } from 'passport-github';
import { VerifyCallback } from "passport-google-oauth20";
import githubConfig from "./github.config";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super(githubConfig());
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { displayName, username, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      displayName,
      username,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}
