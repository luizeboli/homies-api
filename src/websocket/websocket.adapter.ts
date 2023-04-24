import { INestApplication } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { ETC } from 'src/utils/constants/app';
import { IWebsocketSessionManager } from './interfaces/websocket-session.interface';
import { IAuthenticatedSocket } from './interfaces/authenticated-socket.interface';

export class AuthenticatedSocketIoAdapter extends IoAdapter {
  private websocketSessionManager: IWebsocketSessionManager;
  constructor(app: INestApplication) {
    super(app);
    this.websocketSessionManager = app.get(ETC.WEBSOCKET_SESSION_MANAGER);
  }

  createIOServer(port: number, options: ServerOptions) {
    const server = super.createIOServer(port, options) as Server;

    server.use(async (socket: IAuthenticatedSocket, next) => {
      const cookies = socket.handshake.headers.cookie;
      if (!cookies) return next(new Error('Unauthorized'));

      try {
        const { id, username } =
          await this.websocketSessionManager.validateSession(cookies);
        socket.user = {
          id,
          username,
        };
        return next();
      } catch (error) {
        return next(new Error('Unauthorized'));
      }
    });
    return server;
  }
}
