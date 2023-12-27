import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from "../../models/user.model";
import { GoogleStrategy } from "./strategies/google/google.strategy";
import { GithubStrategy } from "./strategies/github/github.strategy";
import { GithubAccessMiddleware } from "./strategies/github/github.middleware";
import { TeamsService } from "../teams/teams.service";
import { Team } from "../../models/team.model";
import { TeamMember } from "../../models/team-member.model";
import {TeamMembersService} from "../teams/team-members/team-members.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, TeamsService, GoogleStrategy, GithubStrategy, TeamMembersService],
  imports: [
    SequelizeModule.forFeature([User, Team, TeamMember]),
    PassportModule,
  ]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GithubAccessMiddleware)
      .forRoutes({ path: 'auth/github*', method: RequestMethod.GET });
  }
}
