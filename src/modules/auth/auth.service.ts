import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../../models/user.model";
import {GithubUser, GoogleUser} from "./strategies/strategies.user.types";
import {AuthPayload, CreateUserDto} from "./auth.dto";
import {TeamsService} from "../teams/teams.service";
import {JwtService} from "@nestjs/jwt";
import {getJwtSecret} from "../../config/configuration";
import {Request} from "express";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private teamsService: TeamsService,
    private jwtService: JwtService
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

  async googleLogin(user: GoogleUser): Promise<AuthPayload> {
    const newUser = await this.createUser({
      email: user.email,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      name: user.firstName ?? null,
      surname: user.lastName ?? null,
      picture: user.picture ?? null,
    });

    return await this.signIn(newUser);
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const { email } = data;

    const [user, created] = await this.userModel.findOrCreate({
      where: { email },
      defaults: data,
      attributes: [
        "id", "email", "username",
        "name", "surname", "picture"
      ]
    });

    return user;
  }

  async signIn(user: User): Promise<AuthPayload> {
    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email
    });
    return {
      user,
      token,
    }
  }

  async loadCurrentUser(email: string): Promise<User> {
    return await this.userModel.findOne({
      where: { email },
      attributes: [
        "id", "email", "username",
        "name", "surname", "picture"
      ]
    });
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }

  async refreshCurrentToken(token: string, id: number, email: string): Promise<string> {
    try {
      const isValid = await this.verifyExpiredToken(token, id, email);
      if (isValid) {
        return await this.jwtService.signAsync({
          sub: id,
          email: email
        });
      }
    } catch (e) {
      throw new BadRequestException();
    }
  }

  private async verifyExpiredToken(token: string, id: number, email: string): Promise<boolean> {
    const tokenData = await this.jwtService.decode(token);
    return tokenData.email === email && tokenData.sub === id;
  }
}
