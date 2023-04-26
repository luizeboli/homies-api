export enum SERVICES {
  CONVERSATIONS = 'ConversationsService',
  USERS = 'UsersService',
  MESSAGES = 'MessagesService',
}

export enum REPOSITORIES {
  CONVERSATIONS = 'ConversationsRepository',
  USERS = 'UsersRepository',
  MESSAGES = 'MessagesRepository',
}

export enum ETC {
  WEBSOCKET_SESSION_MANAGER = 'WebsocketSessionManager',
}

export const ROUTES = {
  CONVERSATIONS: {
    INDEX: 'conversations',
  },
  WEBHOOK: {
    INDEX: 'webhook',
  },
  USERS: {
    INDEX: 'users',
    SEARCH: 'search',
  },
  MESSAGES: {
    INDEX: 'conversations/:conversationId/messages',
  },
} as const;
