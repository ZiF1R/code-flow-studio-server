import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GoogleOAuthGuard } from "./strategies/google/google-oauth.guard";
import { GithubOAuthGuard } from "./strategies/github/github-oauth.guard";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("google")
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {}

  @Get("/google/callback")
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Request() req) {
    return await this.authService.googleLogin(req.user);
  }

  @Get("github")
  @UseGuards(GithubOAuthGuard)
  async githubAccess(@Request() req) {}

  @Get("/github/callback")
  @UseGuards(GithubOAuthGuard)
  async githubAccessRedirect(@Request() req) {
    return await this.authService.githubAccess(req.query.email, req.user);
  }
}
