import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IConversationsService } from './interfaces/conversations-service.interface';
import { Conversation, ConversationCreateInput } from './types';
import { EVENTS, REPOSITORIES } from 'src/utils/constants/app';
import { IConversationsRepository } from './interfaces/conversations-repository.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ConversationsService implements IConversationsService {
  constructor(
    @Inject(REPOSITORIES.CONVERSATIONS)
    private readonly conversationsRepository: IConversationsRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(data: ConversationCreateInput): Promise<Conversation> {
    const { usernames, ownerUsername } = data;
    const sameUsername = usernames.some(
      (username) => username === ownerUsername,
    );
    if (sameUsername) {
      throw new HttpException(
        'You cannot add yourself to the conversation',
        HttpStatus.BAD_REQUEST,
      );
    }

    const conversation = await this.conversationsRepository.create(data);
    this.eventEmitter.emit(EVENTS.CONVERSATION.CREATED, conversation);
    return conversation;
  }

  getConversations(userId: string): Promise<Conversation[]> {
    return this.conversationsRepository.findByUserId(userId);
  }

  delete(id: string): void {
    this.conversationsRepository.delete(id);
  }
}
