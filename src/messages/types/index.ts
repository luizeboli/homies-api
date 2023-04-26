import { CreateMessageDto } from '../dto/create-message.dto';

export type MessageCreateInput = {
  data: CreateMessageDto;
  conversationId: string;
  userId: string;
};
