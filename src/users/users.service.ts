import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/utils/helpers';
import { User, UserCreateInput, UserFindOneInput } from './types';
import { IUsersService } from './interfaces/users-service.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(inputWhere: UserFindOneInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: inputWhere,
    });
  }

  async create(user: UserCreateInput): Promise<User> {
    const { username, email } = user;
    const existingUsername = await this.findOne({ username: username });
    const existingEmail = await this.findOne({ email });

    if (existingUsername)
      throw new ConflictException('Username already exists');

    if (existingEmail) throw new ConflictException('Email already exists');

    const password = await hashPassword(user.password);
    const createdUser = this.prisma.user.create({
      data: {
        ...user,
        password,
      },
    });
    return createdUser;
  }
}
