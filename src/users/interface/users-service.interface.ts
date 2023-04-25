import { CreateUserInput, SearchUsersStartWithInput, User } from '../types';

export interface IUsersService {
  createUser(data: CreateUserInput): Promise<User>;
  searchUsersStartsWith(data: SearchUsersStartWithInput): Promise<User[]>;
}
