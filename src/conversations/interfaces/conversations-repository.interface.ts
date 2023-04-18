import { Conversation, ConversationCreateInput } from '../types';

export interface IConversationsRepository {
  findByUserId(id: string): Promise<Conversation[]>;
  create(data: ConversationCreateInput): Promise<Conversation>;
  delete(id: string): Promise<void>;
}
