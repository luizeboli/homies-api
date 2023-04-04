import {
  Conversation,
  ConversationCreateInput,
  ConversationFindManyInput,
} from '../types';

export interface IConversationsRepository {
  findMany(where?: ConversationFindManyInput): Promise<Conversation[]>;
  create(data: ConversationCreateInput): Promise<Conversation>;
  delete(id: string): Promise<void>;
}
