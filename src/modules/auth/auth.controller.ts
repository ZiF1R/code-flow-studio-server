import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GoogleOAuthGuard } from "./strategies/google/google-oauth.guard";
import { GithubOAuthGuard } from "./strategies/github/github-oauth.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "../../models/user.model";

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({summary: "Authentication with google"})
  @Get("google")
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {}

  @ApiOperation({summary: "Google authentication response"})
  @ApiResponse({status: 200, type: User})
  @Get("/google/callback")
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Request() req) {
    return await this.authService.googleLogin(req.user);
  }

  @ApiOperation({summary: "Access to GitHub account"})
  @Get("github")
  @UseGuards(GithubOAuthGuard)
  async githubAccess(@Request() req) {}

  @ApiOperation({summary: "GitHub access response"})
  @ApiResponse({status: 200, type: User})
  @Get("/github/callback")
  @UseGuards(GithubOAuthGuard)
  async githubAccessRedirect(@Request() req) {
    return await this.authService.githubAccess(req.query.email, req.user);
  }
}
