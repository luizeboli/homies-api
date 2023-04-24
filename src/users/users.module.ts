import { Module } from '@nestjs/common';
import { REPOSITORIES, SERVICES } from 'src/utils/constants/app';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';

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
    {
      provide: REPOSITORIES.USERS,
      useClass: UsersRepository,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
