import {
  User,
  UserCreateInput,
  UserFindManyInput,
  UserFindOneInput,
} from '../types';

export interface IUsersRepository {
  findOne(where: UserFindOneInput): Promise<User | null>;
  findMany(where: UserFindManyInput): Promise<User[]>;
  create(data: UserCreateInput): Promise<User>;
}
