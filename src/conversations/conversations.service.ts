import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IConversationsService } from './interfaces/conversations-service.interface';
import { Conversation, ConversationCreateInput } from './types';
import { REPOSITORIES } from 'src/utils/constants/app';
import { IConversationsRepository } from './interfaces/conversations-repository.interface';
import { IUsersRepository } from 'src/users/interface/users-repository.interface';

@Injectable()
export class ConversationsService implements IConversationsService {
  constructor(
    @Inject(REPOSITORIES.CONVERSATIONS)
    private readonly conversationsRepository: IConversationsRepository,
    @Inject(REPOSITORIES.USERS)
    private readonly usersRepository: IUsersRepository,
  ) {}

  create(data: ConversationCreateInput): Promise<Conversation> {
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

    return this.conversationsRepository.create(data);
  }

  getConversations(username: string): Promise<Conversation[]> {
    return this.conversationsRepository.findByUserId(username);
  }

  delete(id: string): void {
    this.conversationsRepository.delete(id);
  }
}
