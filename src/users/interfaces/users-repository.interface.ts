import { User, UserCreateInput, UserFindOneInput } from '../types';

export interface IUsersRepository {
  findOne(where: UserFindOneInput): Promise<User | null>;
  create(data: UserCreateInput): Promise<User>;
}
