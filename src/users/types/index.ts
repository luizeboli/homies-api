export type User = {
  id: number;
  username: string;
  password: string;
  email: string;
};

export type UserFindOneInput = {
  id?: number;
  username?: string;
  email?: string;
};

export type UserCreateInput = {
  username: string;
  password: string;
  email: string;
};
