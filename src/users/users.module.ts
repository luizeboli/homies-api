import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { REPOSITORIES, SERVICES } from 'src/utils/constants/app';
import { UsersRepository } from './users.repository';

@Module({
  providers: [
    {
      provide: SERVICES.USERS,
      useClass: UsersService,
    },
    {
      provide: REPOSITORIES.USERS,
      useClass: UsersRepository,
    },
  ],
  exports: [
    {
      provide: SERVICES.USERS,
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
