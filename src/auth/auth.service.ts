import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { comparePasswordHash } from './utils/helpers';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ username });
    if (!user) return null;

    const isSamePassword = await comparePasswordHash(pass, user.password);
    if (!isSamePassword) return null;

    return user;
  }
}
