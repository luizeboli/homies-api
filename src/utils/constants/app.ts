export enum SERVICES {
  AUTH = 'AuthService',
  USERS = 'UsersService',
  CONVERSATIONS = 'ConversationsService',
}

export enum REPOSITORIES {
  USERS = 'UsersRepository',
  CONVERSATIONS = 'ConversationsRepository',
}

export const ROUTES = {
  AUTH: {
    INDEX: 'auth',
    LOGIN: 'login',
    REGISTER: 'register',
    STATUS: 'status',
  },
  CONVERSATIONS: {
    INDEX: 'conversations',
  },
} as const;
