import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { SERVICES } from 'src/utils/constants/app';
import { IAuthService } from '../interfaces/auth-service.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(SERVICES.AUTH) private authService: IAuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
