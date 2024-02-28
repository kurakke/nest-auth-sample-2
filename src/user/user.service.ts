import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  create(data: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  findOne(name: User['name']): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { name },
    });
  }
}
