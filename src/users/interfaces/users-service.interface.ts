import { User, UserCreateInput, UserFindOneInput } from '../types';

export interface IUsersService {
  findUser(where: UserFindOneInput): Promise<User | null>;
  create(data: UserCreateInput): Promise<User>;
}
