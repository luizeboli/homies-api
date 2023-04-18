import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [WebhookController],
})
export class WebhookModule {}
