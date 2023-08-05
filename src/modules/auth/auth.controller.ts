import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "../../models/user.model";
import { GoogleOAuthGuard } from "./strategies/google/google-oauth.guard";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("/user")
  async getUser(): Promise<User> {
    return await this.authService.getUser(1);
  }

  @Get("google")
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {}

  @Get("/google/callback")
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Request() req) {
    return await this.authService.googleLogin(req.user);
  }
}
