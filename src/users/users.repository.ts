import { Injectable } from '@nestjs/common';
import { IUsersRepository } from './interfaces/users-repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserFindOneInput, User, UserCreateInput } from './types';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findOne(where: UserFindOneInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where,
    });
  }

  create(data: UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
}
