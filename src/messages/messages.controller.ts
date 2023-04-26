import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { ROUTES, SERVICES } from 'src/utils/constants/app';
import { IMessagesService } from './interfaces/messages-service.interface';
import { AuthUser } from 'src/utils/decorators/auth-user';
import { User } from 'src/users/types';

@Controller(ROUTES.MESSAGES.INDEX)
export class MessagesController {
  constructor(
    @Inject(SERVICES.MESSAGES)
    private readonly messagesService: IMessagesService,
  ) {}

  @Post()
  create(
    @Param('conversationId') conversationId: string,
    @Body() data: CreateMessageDto,
    @AuthUser() { id }: User,
  ) {
    return this.messagesService.create({ conversationId, data, userId: id });
  }
}