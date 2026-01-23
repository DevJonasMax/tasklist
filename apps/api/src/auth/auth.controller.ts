import { Body, Controller, Post, Res } from '@nestjs/common';
import { SignUpDto, SignInDto } from './dtos/auth';
import { AuthService } from './auth.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signin')
  signIn(@Body() body: SignInDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.signIn(body, res);
  }

  @Post('signup')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }
  @Post('signout')
  signOut(@Res({ passthrough: true }) res: Response) {
    return this.authService.signOut(res);
  }
}
