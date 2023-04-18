import { Conversation, ConversationCreateInput } from '../types';

export interface IConversationsService {
  getConversations(username: string): Promise<Conversation[]>;
  create(data: ConversationCreateInput): Promise<Conversation>;
  delete(id: string): void;
}
