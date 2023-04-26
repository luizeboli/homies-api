import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IMessagesService } from './interfaces/messages-service.interface';
import { REPOSITORIES } from 'src/utils/constants/app';
import { IMessagesRepository } from './interfaces/messages-repository.interface';
import { MessageCreateInput } from './types';
import { IConversationsRepository } from 'src/conversations/interfaces/conversations-repository.interface';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService implements IMessagesService {
  constructor(
    @Inject(REPOSITORIES.MESSAGES)
    private readonly messagesRepository: IMessagesRepository,
    @Inject(REPOSITORIES.CONVERSATIONS)
    private readonly conversationsRepository: IConversationsRepository,
  ) {}

  async create(input: MessageCreateInput): Promise<Message> {
    const { conversationId, userId } = input;

    const conversation = await this.conversationsRepository.findUniqueById(
      conversationId,
      userId,
    );

    if (!conversation) {
      throw new HttpException('Cannot create message', HttpStatus.BAD_REQUEST);
    }

    return this.messagesRepository.create(input);
  }
}
