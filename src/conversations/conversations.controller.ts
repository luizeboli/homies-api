import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ROUTES, SERVICES } from 'src/utils/constants/app';
import { IConversationsService } from './interfaces/conversations-service.interface';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { AuthUser } from 'src/utils/decorators/auth-user';
import { User } from 'src/users/types';

@Controller(ROUTES.CONVERSATIONS.INDEX)
export class ConversationsController {
  constructor(
    @Inject(SERVICES.CONVERSATIONS)
    private readonly conversationsService: IConversationsService,
  ) {}

  @Get()
  getConversations(@AuthUser() user: User) {
    return this.conversationsService.getConversations(user.id);
  }

  @Get(':conversationId')
  getConversation(
    @AuthUser() user: User,
    @Param('conversationId') conversationId: string,
  ) {
    return this.conversationsService.getConversation(conversationId, user.id);
  }

  @Post()
  create(@AuthUser() user: User, @Body() body: CreateConversationDto) {
    const { usernames } = body;
    return this.conversationsService.create({
      ownerUsername: user.username,
      usernames,
    });
  }
}
