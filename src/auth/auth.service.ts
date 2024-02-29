import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findOne(username);
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (user && isMatch) {
      return user;
    }
    throw new ForbiddenException('Invalid username or password');
  }

  async signup(user: SignupDto) {
    const salt = this.configService.get<number>('SALT');
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const createUser: CreateUserDto = {
      name: user.name,
      email: user.email,
      hashedPassword,
    };
    return this.userService.create(createUser);
  }

  async login(user: User) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
