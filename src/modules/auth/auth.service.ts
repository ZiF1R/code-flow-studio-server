import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../../models/user.model";
import { GithubUser, GoogleUser } from "./strategies/strategies.user.types";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async githubAccess(googleEmail: string, githubUser: GithubUser) {
    if (!googleEmail) {
      throw new UnauthorizedException("Have to provide email for GitHub" +
        " access");
    }

    const users = await this.userModel.findAll({
      where: { email: googleEmail }
    });

    if (users.length) {
      const user = users[0];
      user.set({
        githubAccessToken: githubUser.accessToken
      });
      await user.save();
    } else {
      throw new UnauthorizedException("Wrong email");
    }
  }

  async googleLogin(user: GoogleUser) {
    return await this.userModel.findOrCreate({
      where: { email: user.email },
      defaults: {
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
        name: user.firstName ?? null,
        surname: user.lastName ?? null,
        picture: user.picture ?? null,
      }
    });
  }
}
