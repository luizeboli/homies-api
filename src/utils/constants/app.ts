export enum SERVICES {
  CONVERSATIONS = 'ConversationsService',
  USERS = 'UsersService',
}

export enum REPOSITORIES {
  CONVERSATIONS = 'ConversationsRepository',
  USERS = 'UsersRepository',
}

export enum ETC {
  WEBSOCKET_SESSION_MANAGER = 'WebsocketSessionManager',
}

export const EVENTS = {
  CONVERSATION: {
    CREATED: 'conversation.created',
  },
} as const;

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
} as const;
