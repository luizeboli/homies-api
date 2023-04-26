import { Inject, UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  WsException,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { IAuthenticatedSocket } from './interfaces/authenticated-socket.interface';
import { ETC, SERVICES } from 'src/utils/constants/app';
import { IWebsocketSessionManager } from './interfaces/websocket-session.interface';
import { WebsocketAuthenticatedGuard } from './guards/authenticated.guard';
import { OnEvent } from '@nestjs/event-emitter';
import { Conversation } from 'src/conversations/types';
import { Message } from 'src/messages/entities/message.entity';
import { EVENT_EMITTER_EVENTS } from 'src/utils/constants/event-emitter';
import { WEBSOCKET_EVENTS } from 'src/utils/constants/websocket';
import { IConversationsService } from 'src/conversations/interfaces/conversations-service.interface';

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
    @Inject(SERVICES.CONVERSATIONS)
    private readonly conversationsService: IConversationsService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(socket: IAuthenticatedSocket) {
    this.websocketSessionManager.addSession(socket.user.id, socket);
  }

  handleDisconnect(socket: IAuthenticatedSocket) {
    this.websocketSessionManager.removeSession(socket.user.id);
  }

  @SubscribeMessage(WEBSOCKET_EVENTS.CONVERSATION.JOINED)
  async handleConversationJoined(
    @ConnectedSocket() socket: IAuthenticatedSocket,
    @MessageBody() conversationId: string,
  ) {
    const { id } = socket.user;
    const conversation = await this.conversationsService.getConversation(
      conversationId,
      id,
    );
    if (!conversation) {
      throw new WsException('Conversation not found');
    }

    socket.join(`conversation-${conversationId}`);
  }

  @OnEvent(EVENT_EMITTER_EVENTS.CONVERSATION.CREATED)
  handleConversationCreated(conversation: Conversation) {
    const socketUsers = conversation.users.map((user) =>
      this.websocketSessionManager.getSession(user.id),
    );
    socketUsers.forEach((socket) => {
      if (socket) {
        socket.emit(WEBSOCKET_EVENTS.CONVERSATION.CREATED, conversation);
      }
    });
  }

  @OnEvent(EVENT_EMITTER_EVENTS.MESSAGE.CREATED)
  handleMessageCreated(message: Message) {
    const { conversationId } = message;
    const roomName = `conversation-${conversationId}`;
    const { rooms } = this.server.sockets.adapter;

    const socketsInConversation = rooms.get(roomName);
    if (!socketsInConversation?.size) return;

    this.server.to(roomName).emit(WEBSOCKET_EVENTS.MESSAGE.CREATED, message);
  }
}
