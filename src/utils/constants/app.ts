export enum SERVICES {
  CONVERSATIONS = 'ConversationsService',
  USERS = 'UsersService',
}

export enum REPOSITORIES {
  CONVERSATIONS = 'ConversationsRepository',
  USERS = 'UsersRepository',
}

export const ROUTES = {
  CONVERSATIONS: {
    INDEX: 'conversations',
  },
  WEBHOOK: {
    INDEX: 'webhook',
  },
} as const;
