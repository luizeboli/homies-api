import { Inject, Injectable, NestMiddleware, UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  SubscribeMessage,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IAuthenticatedSocket } from './interfaces/authenticated-socket.interface';
import { ETC } from 'src/utils/constants/app';
import { IWebsocketSessionManager } from './interfaces/websocket-session.interface';
import { WebsocketAuthenticatedGuard } from './guards/authenticated.guard';

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

  @SubscribeMessage('onFelps')
  handleMessage(client: Socket, payload: any) {
    console.log(client.id, 'Message');
  }
}
