import { Socket } from 'socket.io';
import { User } from 'src/users/types';

export interface IAuthenticatedSocket extends Socket {
  user: User;
}
