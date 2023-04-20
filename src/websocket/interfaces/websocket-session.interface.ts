import { Socket } from 'socket.io';
import { User } from 'src/users/types';

export interface IWebsocketSessionManager {
  addSession(userId: string, socket: Socket): void;
  removeSession(userId: string): void;
  getSession(userId: string): Socket | undefined;
  validateSession(cookies: string): Promise<User>;
}
