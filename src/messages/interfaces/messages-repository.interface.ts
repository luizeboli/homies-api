import { Message } from '../entities/message.entity';
import { MessageCreateInput } from '../types';

export interface IMessagesRepository {
  create(data: MessageCreateInput): Promise<Message>;
}
