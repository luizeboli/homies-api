import { CreateUserInput, User } from '../types';

export interface IUsersRepository {
  create(data: CreateUserInput): Promise<User>;
  findById(id: string): Promise<User | null>;
}
