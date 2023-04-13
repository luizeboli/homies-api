import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticatedGuard } from './utils/guards/authenticated.guard';
import { ConfigModule } from '@nestjs/config';
import { ConversationsModule } from './conversations/conversations.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, ConversationsModule],
  providers: [{ provide: APP_GUARD, useClass: AuthenticatedGuard }],
})
export class AppModule {}
