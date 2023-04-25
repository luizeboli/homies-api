import { Controller, Get, Inject, ParseBoolPipe, Query } from '@nestjs/common';
import { ROUTES, SERVICES } from 'src/utils/constants/app';
import { IUsersService } from './interface/users-service.interface';
import { AuthUser } from 'src/utils/decorators/auth-user';
import { User } from './types';

@Controller(ROUTES.USERS.INDEX)
export class UsersController {
  constructor(
    @Inject(SERVICES.USERS) private readonly usersService: IUsersService,
  ) {}

  @Get(ROUTES.USERS.SEARCH)
  async search(
    @Query('username') username: string,
    @Query('includeSelf', ParseBoolPipe) includeSelf: boolean,
    @AuthUser() user: User,
  ) {
    const data = { username, includeSelf, user };
    return this.usersService.searchUsersStartsWith(data);
  }
}
