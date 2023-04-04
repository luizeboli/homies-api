export type User = {
  id: string;
  username: string;
  password: string;
  email: string;
};

export type UserFindManyInput = {
  ids?: string[];
};

export type UserFindOneInput = {
  id?: string;
  username?: string;
  email?: string;
};

export type UserCreateInput = {
  username: string;
  password: string;
  email: string;
};
