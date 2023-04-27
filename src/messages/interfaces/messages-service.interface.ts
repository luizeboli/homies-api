import { Message } from '../entities/message.entity';
import { MessageCreateInput, MessageFindInput } from '../types';

export interface IMessagesService {
  create(data: MessageCreateInput): Promise<Message>;
  find(data: MessageFindInput): Promise<Message[]>;
}
