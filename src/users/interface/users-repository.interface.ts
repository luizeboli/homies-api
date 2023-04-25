import { CreateUserInput, SearchUsersStartWithInput, User } from '../types';

export interface IUsersRepository {
  create(data: CreateUserInput): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findManyByUsername(usernames: string[]): Promise<User[]>;
  findByUsernameStartsWith(data: SearchUsersStartWithInput): Promise<User[]>;
}
