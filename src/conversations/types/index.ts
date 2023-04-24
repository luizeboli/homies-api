import { User } from 'src/users/types';

export type Conversation = {
  id: string;
  ownerUserId: string;
  owner: User;
  users: User[];
};

export type ConversationCreateInput = {
  ownerUsername: string;
  usernames: string[];
};
