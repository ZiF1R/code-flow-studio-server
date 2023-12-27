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
    InvitationsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
