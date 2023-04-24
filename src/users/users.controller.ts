import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ROUTES, SERVICES } from 'src/utils/constants/app';
import { IUsersService } from './interface/users-service.interface';

@Controller(ROUTES.USERS.INDEX)
export class UsersController {
  constructor(
    @Inject(SERVICES.USERS) private readonly usersService: IUsersService,
  ) {}

  @Get(ROUTES.USERS.SEARCH)
  async search(@Query('username') username: string) {
    return this.usersService.searchUsersStartsWith(username);
  }
}
