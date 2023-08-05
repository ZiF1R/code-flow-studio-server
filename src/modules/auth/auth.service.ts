import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../../models/user.model";
import { CreateUserDto } from "./auth.dto";

type GoogleUser = {
  email: string,
  firstName: string,
  lastName: string,
  picture: string,
  accessToken: string,
  refreshToken: string,
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async googleLogin(user: GoogleUser) {
    const validUser = await this.validateUser(user.email);

    if (!validUser) {
      return await this.createUser({
        email: user.email,
        name: user.firstName ?? null,
        surname: user.lastName ?? null,
        avatar_link: user.picture ?? null,
      });
    }

    return validUser;
  }

  async validateUser(email: string): Promise<any> {
    const users = await this.userModel.findAll({
      where: {email}
    });
    return users[0] ?? null;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return await this.userModel.create(data);
  }

  async getUser(pk: number): Promise<User> {
    return await this.userModel.findByPk(pk);
  }
}
