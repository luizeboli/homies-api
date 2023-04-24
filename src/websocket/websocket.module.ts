import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { ETC } from 'src/utils/constants/app';
import { WebsocketSessionManager } from './websocket.session';

@Module({
  providers: [
    WebsocketGateway,
    {
      provide: ETC.WEBSOCKET_SESSION_MANAGER,
      useClass: WebsocketSessionManager,
    },
  ],
})
export class WebsocketModule {}
