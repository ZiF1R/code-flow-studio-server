import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Users } from "../../models/user.model";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    SequelizeModule.forFeature([Users])
  ]
})
export class AuthModule {}
