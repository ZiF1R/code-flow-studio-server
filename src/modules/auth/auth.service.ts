import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../../models/user.model";
import { GithubUser, GoogleUser } from "./strategies/strategies.user.types";
import { CreateUserDto } from "./auth.dto";
import { TeamsService } from "../teams/teams.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private teamsService: TeamsService,
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
    return await this.createUser({
      email: user.email,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      name: user.firstName ?? null,
      surname: user.lastName ?? null,
      picture: user.picture ?? null,
    });
  }

  async createUser(data: CreateUserDto) {
    const { email } = data;

    const [user, created] = await this.userModel.findOrCreate({
      where: { email },
      defaults: data,
    });

    if (created) {
      await this.teamsService.createTeam({
        name: "Personal",
        adminId: user.id,
      })
    }

    return user;
  }
}
