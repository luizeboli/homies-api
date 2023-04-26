import {
  Conversation,
  ConversationCreateInput,
  FindUniqueByIdInclude,
} from '../types';

export interface IConversationsService {
  getConversations(username: string): Promise<Conversation[]>;
  getConversation(
    id: string,
    userId: string,
    include?: FindUniqueByIdInclude,
  ): Promise<Conversation | null>;
  create(data: ConversationCreateInput): Promise<Conversation>;
  delete(id: string): void;
}
