import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUsersRepository } from './interface/users-repository.interface';
import { CreateUserInput, User } from './types';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserInput): Promise<User> {
    const { id, username } = data;
    return this.prisma.user.create({
      data: {
        id,
        username,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findManyByUsername(usernames: string[]): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        username: {
          in: usernames,
        },
      },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
}
