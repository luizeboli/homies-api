import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUsersService } from './interface/users-service.interface';
import { CreateUserInput, SearchUsersStartWithInput, User } from './types';
import { REPOSITORIES } from 'src/utils/constants/app';
import { IUsersRepository } from './interface/users-repository.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(REPOSITORIES.USERS)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async createUser(data: CreateUserInput): Promise<User> {
    const foundUser = await this.usersRepository.findById(data.id);
    if (foundUser)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);

    return this.usersRepository.create(data);
  }

  async searchUsersStartsWith(
    data: SearchUsersStartWithInput,
  ): Promise<User[]> {
    return this.usersRepository.findByUsernameStartsWith(data);
  }
}
