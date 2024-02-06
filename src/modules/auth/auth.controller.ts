import {
  Controller,
  Get, HttpStatus,
  Redirect,
  Request, Res,
  Response,
  UseGuards
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GoogleOAuthGuard } from "./strategies/google/google-oauth.guard";
import { GithubOAuthGuard } from "./strategies/github/github-oauth.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "../../models/user.model";
import {SkipAuth} from "./skip-auth.decorator";

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @ApiOperation({summary: "Authentication with google"})
  @Get("google")
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {}

  @SkipAuth()
  @ApiOperation({summary: "Google authentication response"})
  @ApiResponse({status: 200, type: User})
  @Get("/google/callback")
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Res() res, @Request() req) {
    const data = await this.authService.googleLogin(req.user);
    return res.status(HttpStatus.OK).json({...data});
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

  @Get("/user/current")
  async getCurrentUser(@Res() res, @Request() req) {
    const user = await this.authService.loadCurrentUser(req.auth?.email);
    return res.status(HttpStatus.OK).json({user});
  }
}
