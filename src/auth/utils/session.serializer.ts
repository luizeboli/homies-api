import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

type DoneFn = (err: Error | null, user: any) => void;

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: DoneFn) {
    done(null, user.id);
  }

  async deserializeUser(userId: number, done: DoneFn) {
    const user = await this.usersService.findOne({ id: userId });
    done(null, user);
  }
}
