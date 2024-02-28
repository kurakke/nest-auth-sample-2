import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  findOne(name: User['name']): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { name },
    });
  }
}
