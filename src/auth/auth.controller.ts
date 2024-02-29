import { Request, Controller, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/auth-local.guard';
import { AuthService } from 'src/auth/auth.service';
import { SignupDto } from './dto/signup.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.userId);
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
