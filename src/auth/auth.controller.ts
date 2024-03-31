import { AuthService } from './auth.service';
import { Controller, Get, Post, UseGuards, Request, Res } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { GoogleAuthGuard } from './google-auth.guard';

import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async validate(@Request() req: any, @Res({ passthrough: true }) res: any) {
    const result = await this.authService.login(req.user);
    if (result?.accessToken) {
      const accessToken = result.accessToken;

      res.cookie('access_token', accessToken, {
        httpOnly: true,
      });
      res.json({ message: 'Successfully logged in', accessToken: accessToken });
    } else {
      return { message: result };
    }
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth(@Request() req: any) {
    // Initiates the Google OAuth process
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleAuthRedirect(
    @Request() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.googleLogin(req);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });
    res.redirect('/users/profile');
  }

  @Get('logout')
  async logout(@Request() req: any, @Res() res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
    });
    res.json({ message: 'Successfully logged out' });
  }
}
