import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { REPOSITORIES, SERVICES } from 'src/utils/constants/app';
import { MessagesRepository } from './messages.repository';
import { ConversationsModule } from 'src/conversations/conversations.module';

@Module({
  imports: [ConversationsModule],
  controllers: [MessagesController],
  providers: [
    {
      provide: SERVICES.MESSAGES,
      useClass: MessagesService,
    },
    {
      provide: REPOSITORIES.MESSAGES,
      useClass: MessagesRepository,
    },
  ],
})
export class MessagesModule {}
