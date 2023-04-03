import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SERVICES } from 'src/utils/constants/app';

@Module({
  providers: [
    {
      provide: SERVICES.USERS,
      useClass: UsersService,
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
