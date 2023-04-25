export type CreateUserInput = User;

export type User = {
  id: string;
  username: string;
};

export type SearchUsersStartWithInput = {
  username: string;
  includeSelf: boolean;
  user: User;
};
