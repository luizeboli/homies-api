export enum SERVICES {
  AUTH = 'AuthService',
  USERS = 'UsersService',
}

export enum REPOSITORIES {
  USERS = 'UsersRepository',
}

export const ROUTES = {
  AUTH: {
    INDEX: 'auth',
    LOGIN: 'login',
    REGISTER: 'register',
    STATUS: 'status',
  },
} as const;
