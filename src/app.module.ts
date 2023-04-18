import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticatedGuard } from './utils/guards/authenticated.guard';
import { ConfigModule } from '@nestjs/config';
import { ConversationsModule } from './conversations/conversations.module';
import { WebhookController } from './webhook/webhook.controller';
import { WebhookModule } from './webhook/webhook.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    ConversationsModule,
    UsersModule,
    WebhookModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthenticatedGuard }],
  controllers: [WebhookController],
})
export class AppModule {}
