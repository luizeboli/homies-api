import { Conversation, ConversationCreateInput } from '../types';

export interface IConversationsService {
  getConversations(username: string): Promise<Conversation[]>;
  getConversation(id: string, userId: string): Promise<Conversation | null>;
  create(data: ConversationCreateInput): Promise<Conversation>;
  delete(id: string): void;
}
