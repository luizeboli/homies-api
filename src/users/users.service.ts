import { Inject, Injectable } from '@nestjs/common';
import { hashPassword } from 'src/utils/helpers';
import { User, UserCreateInput, UserFindOneInput } from './types';
import { IUsersService } from './interfaces/users-service.interface';
import { REPOSITORIES } from 'src/utils/constants/app';
import { IUsersRepository } from './interfaces/users-repository.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(REPOSITORIES.USERS)
    private readonly usersRepository: IUsersRepository,
  ) {}

  findUser(where: UserFindOneInput): Promise<User | null> {
    return this.usersRepository.findOne(where);
  }

  async create(user: UserCreateInput): Promise<User> {
    const password = await hashPassword(user.password);
    const createdUser = this.usersRepository.create({
      ...user,
      password,
    });
    return createdUser;
  }
}
