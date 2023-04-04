import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { REPOSITORIES, SERVICES } from 'src/utils/constants/app';
import { ConversationsRepository } from './conversations.repository';

@Module({
  providers: [
    {
      provide: SERVICES.CONVERSATIONS,
      useClass: ConversationsService,
    },
    {
      provide: REPOSITORIES.CONVERSATIONS,
      useClass: ConversationsRepository,
    },
  ],
  controllers: [ConversationsController],
})
export class ConversationsModule {}
