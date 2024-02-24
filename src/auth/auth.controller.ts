import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth-local.guard';

@Controller('auth')
export class AuthController {
  constructor() {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
