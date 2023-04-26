import {
  Conversation,
  ConversationCreateInput,
  FindUniqueByIdInclude,
} from '../types';

export interface IConversationsRepository {
  findByUserId(id: string): Promise<Conversation[]>;
  findUniqueById(
    id: string,
    userId: string,
    include?: FindUniqueByIdInclude,
  ): Promise<Conversation | null>;
  create(data: ConversationCreateInput): Promise<Conversation>;
  delete(id: string): Promise<void>;
}
