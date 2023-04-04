import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticatedGuard } from './auth/utils/authenticated.guard';
import { ConversationsModule } from './conversations/conversations.module';
import { IsExistingUser } from './utils/validators/user-exists';
import { IsUserFieldAvailable } from './utils/validators/user-field-available';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ConversationsModule],
  providers: [
    { provide: APP_GUARD, useClass: AuthenticatedGuard },
    IsExistingUser,
    IsUserFieldAvailable,
  ],
})
export class AppModule {}
