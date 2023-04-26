import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IMessagesService } from './interfaces/messages-service.interface';
import { REPOSITORIES } from 'src/utils/constants/app';
import { IMessagesRepository } from './interfaces/messages-repository.interface';
import { MessageCreateInput } from './types';
import { IConversationsRepository } from 'src/conversations/interfaces/conversations-repository.interface';
import { Message } from './entities/message.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENT_EMITTER_EVENTS } from 'src/utils/constants/event-emitter';

@Injectable()
export class MessagesService implements IMessagesService {
  constructor(
    @Inject(REPOSITORIES.MESSAGES)
    private readonly messagesRepository: IMessagesRepository,
    @Inject(REPOSITORIES.CONVERSATIONS)
    private readonly conversationsRepository: IConversationsRepository,
    private readonly eventEmitter: EventEmitter2,
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

    const message = await this.messagesRepository.create(input);
    this.eventEmitter.emit(EVENT_EMITTER_EVENTS.MESSAGE.CREATED, message);
    return message;
  }
}
