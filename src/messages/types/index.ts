import { CreateMessageDto } from '../dto/create-message.dto';

export type MessageCreateInput = {
  data: CreateMessageDto;
  conversationId: string;
  userId: string;
};

export type MessageFindInput = {
  conversationId: string;
  userId: string;
  take: number;
  cursor?: string;
};
