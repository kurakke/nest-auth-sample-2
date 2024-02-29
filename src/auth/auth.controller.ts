import { Request, Controller, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/auth-local.guard';
import { AuthService } from 'src/auth/auth.service';
import { SignupDto } from './dto/signup.dto';
import { JwtPayload } from './types/jwt-payload.type';
import { loginDto } from './dto/login.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() body: loginDto) {
    const paylaod: JwtPayload = {
      username: body.username,
      sub: req.user.userId,
    };
    return this.authService.login(paylaod);
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
