import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth-local.guard';
import { AuthService } from 'src/auth/auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.userId);
  }
}
