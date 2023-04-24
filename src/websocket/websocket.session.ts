import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { IWebsocketSessionManager } from './interfaces/websocket-session.interface';
import * as jose from 'jose';
import * as cookie from 'cookie';
import { User } from 'src/users/types';

@Injectable()
export class WebsocketSessionManager implements IWebsocketSessionManager {
  private sessions: Map<string, Socket> = new Map();

  async validateSession(cookies: string): Promise<User> {
    const splitPem = process.env.CLERK_JWT_PUBLIC_KEY.match(/.{1,64}/g);
    const spki =
      '-----BEGIN PUBLIC KEY-----\n' +
      splitPem?.join('\n') +
      '\n-----END PUBLIC KEY-----';

    const alg = 'RS256';
    const publicKey = await jose.importSPKI(spki, alg);

    const { __session } = cookie.parse(cookies);
    if (!__session) throw new Error('Unauthorized');

    const { payload } = await jose.jwtVerify(__session, publicKey);
    return {
      id: payload.userId as string,
      username: payload.username as string,
    };
  }

  addSession(userId: string, socket: Socket) {
    this.sessions.set(userId, socket);
  }

  removeSession(userId: string) {
    this.sessions.delete(userId);
  }

  getSession(userId: string) {
    return this.sessions.get(userId);
  }
}
