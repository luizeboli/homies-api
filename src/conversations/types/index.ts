import { User } from 'src/users/types';

export type Conversation = {
  id: string;
  users: User[];
  ownerId: string;
};

export type ConversationFindManyInput = {
  ownerId?: string;
  userId?: string;
};

export type ConversationCreateInput = {
  ownerId: string;
  userIds: string[];
};
