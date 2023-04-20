import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IWebsocketSessionManager } from '../interfaces/websocket-session.interface';
import { ETC } from 'src/utils/constants/app';
import { IAuthenticatedSocket } from '../interfaces/authenticated-socket.interface';

@Injectable()
export class WebsocketAuthenticatedGuard implements CanActivate {
  constructor(
    @Inject(ETC.WEBSOCKET_SESSION_MANAGER)
    private websocketSessionManager: IWebsocketSessionManager,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socket = context.switchToWs().getClient<IAuthenticatedSocket>();
    const cookies = socket.handshake.headers.cookie;

    if (!cookies) return false;

    try {
      await this.websocketSessionManager.validateSession(cookies);
      return true;
    } catch (error) {
      return false;
    }
  }
}
