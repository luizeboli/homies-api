import { Conversation, ConversationCreateInput } from '../types';

export interface IConversationsService {
  getConversations(userId: string): Promise<Conversation[]>;
  create(data: ConversationCreateInput): Promise<Conversation>;
  delete(id: string): void;
}
