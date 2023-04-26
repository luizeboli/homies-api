import { Message } from 'src/messages/entities/message.entity';
import { User } from 'src/users/types';

export type Conversation = {
  id: string;
  ownerUserId: string;
  owner: User;
  users: User[];
  messages?: Message[];
};

export type ConversationCreateInput = {
  ownerUsername: string;
  usernames: string[];
};

export type FindUniqueByIdInclude = {
  messages: boolean;
};
