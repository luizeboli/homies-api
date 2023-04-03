import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { IUsersService } from 'src/users/interfaces/users-service.interface';
import { SERVICES } from 'src/utils/constants/app';

type DoneFn = (err: Error | null, user: any) => void;

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(SERVICES.USERS) private usersService: IUsersService) {
    super();
  }

  serializeUser(user: any, done: DoneFn) {
    done(null, user.id);
  }

  async deserializeUser(userId: number, done: DoneFn) {
    const user = await this.usersService.findUser({ id: userId });
    done(null, user);
  }
}
