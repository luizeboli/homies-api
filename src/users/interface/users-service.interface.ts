import { CreateUserInput, User } from '../types';

export interface IUsersService {
  createUser(data: CreateUserInput): Promise<User>;
  searchUsersStartsWith(username: string): Promise<User[]>;
}
