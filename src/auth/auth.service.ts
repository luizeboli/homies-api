import { Inject, Injectable } from '@nestjs/common';
import { comparePasswordHash } from './utils/helpers';
import { IAuthService } from './interfaces/auth-service.interface';
import { SERVICES } from 'src/utils/constants/app';
import { IUsersService } from 'src/users/interfaces/users-service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject(SERVICES.USERS) private usersService: IUsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ username });
    if (!user) return null;

    const isSamePassword = await comparePasswordHash(pass, user.password);
    if (!isSamePassword) return null;

    return user;
  }
}
