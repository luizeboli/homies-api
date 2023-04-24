import { Inject, UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { IAuthenticatedSocket } from './interfaces/authenticated-socket.interface';
import { ETC, EVENTS } from 'src/utils/constants/app';
import { IWebsocketSessionManager } from './interfaces/websocket-session.interface';
import { WebsocketAuthenticatedGuard } from './guards/authenticated.guard';
import { OnEvent } from '@nestjs/event-emitter';
import { Conversation } from 'src/conversations/types';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
  pingInterval: 10000,
  pingTimeout: 15000,
  path: '/ws',
})
@UseGuards(WebsocketAuthenticatedGuard)
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(ETC.WEBSOCKET_SESSION_MANAGER)
    private websocketSessionManager: IWebsocketSessionManager,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(socket: IAuthenticatedSocket) {
    this.websocketSessionManager.addSession(socket.user.id, socket);
  }

  handleDisconnect(socket: IAuthenticatedSocket) {
    this.websocketSessionManager.removeSession(socket.user.id);
  }

  @OnEvent(EVENTS.CONVERSATION.CREATED)
  handleConversationCreated(conversation: Conversation) {
    const socketUsers = conversation.users.map((user) =>
      this.websocketSessionManager.getSession(user.id),
    );
    socketUsers.forEach((socket) => {
      if (socket) {
        socket.emit(EVENTS.CONVERSATION.CREATED, conversation);
      }
    });
  }
}
