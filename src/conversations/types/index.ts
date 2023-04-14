export type Conversation = {
  id: string;
  ownerUsername: string;
};

export type ConversationFindManyInput = {
  ownerUsername?: string;
  username?: string;
};

export type ConversationCreateInput = {
  ownerUsername: string;
  usernames: string[];
};
