import { Message } from '../entities/message.entity';
import { MessageCreateInput } from '../types';

export interface IMessagesService {
  create(data: MessageCreateInput): Promise<Message>;
}
