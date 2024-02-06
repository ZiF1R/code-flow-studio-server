import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TeamsModule } from './modules/teams/teams.module';
import { TeamMembersModule } from './modules/teams/team-members/team-members.module';
import { ProjectsModule } from './modules/projects/projects.module';
import configuration from "./config/configuration";
import {
  InvitationsModule
} from "./modules/teams/invitations/invitations.module";
import {TemplatesModule} from "./modules/projects/templates/templates.module";
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "./modules/auth/auth.guard";
import {AuthService} from "./modules/auth/auth.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true
    }),
    SequelizeModule.forRoot(configuration().database),
    AuthModule,
    TeamsModule,
    ProjectsModule,
    TeamMembersModule,
    InvitationsModule,
    TemplatesModule
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard }
  ],
})
export class AppModule {}
