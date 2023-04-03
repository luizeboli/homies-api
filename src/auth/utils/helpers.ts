import * as bcrypt from 'bcrypt';

export const comparePasswordHash = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
