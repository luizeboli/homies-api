import { User, UserCreateInput, UserFindOneInput } from '../types';

export interface IUsersService {
  findOne(inputWhere: UserFindOneInput): Promise<User | null>;
  create(user: UserCreateInput): Promise<User>;
}
