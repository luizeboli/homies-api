export type Conversation = {
  id: string;
  ownerUserId: string;
};

export type ConversationCreateInput = {
  ownerUsername: string;
  usernames: string[];
};
