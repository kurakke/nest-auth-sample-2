import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  findOneUser(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }
}
