import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../../models/user.model";
import { PassportModule } from "@nestjs/passport";
import { GoogleStrategy } from "./strategies/google/google.strategy";

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  imports: [
    SequelizeModule.forFeature([User]),
    PassportModule,
  ]
})
export class AuthModule {}
