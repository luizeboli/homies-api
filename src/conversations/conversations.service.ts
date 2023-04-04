import { Inject, Injectable } from '@nestjs/common';
import { IConversationsService } from './interfaces/conversations-service.interface';
import { Conversation, ConversationCreateInput } from './types';
import { REPOSITORIES } from 'src/utils/constants/app';
import { IConversationsRepository } from './interfaces/conversations-repository.interface';

@Injectable()
export class ConversationsService implements IConversationsService {
  constructor(
    @Inject(REPOSITORIES.CONVERSATIONS)
    private readonly conversationsRepository: IConversationsRepository,
  ) {}

  create(data: ConversationCreateInput): Promise<Conversation> {
    return this.conversationsRepository.create(data);
  }

  getConversations(userId: string): Promise<Conversation[]> {
    return this.conversationsRepository.findMany({ userId });
  }

  delete(id: string): void {
    this.conversationsRepository.delete(id);
  }
}
