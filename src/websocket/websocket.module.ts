import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { ETC } from 'src/utils/constants/app';
import { WebsocketSessionManager } from './websocket.session';
import { ConversationsModule } from 'src/conversations/conversations.module';

@Module({
  imports: [ConversationsModule],
  providers: [
    WebsocketGateway,
    {
      provide: ETC.WEBSOCKET_SESSION_MANAGER,
      useClass: WebsocketSessionManager,
    },
  ],
})
export class WebsocketModule {}
