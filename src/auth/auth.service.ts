import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(
    username: string,
    hashedPassword: string,
  ): Promise<User | null> {
    const user = await this.userService.findOne(username);
    if (user && user.hashedPassword === hashedPassword) {
      return user;
    }
    return null;
  }
}
