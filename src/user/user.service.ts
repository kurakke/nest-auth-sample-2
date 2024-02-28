import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async create(data: CreateUserDto): Promise<User> {
    return await this.prismaService.user.create({ data });
  }

  async findOne(name: User['name']): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: { name },
    });
  }
}
