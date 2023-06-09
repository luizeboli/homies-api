import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ROUTES, SERVICES } from 'src/utils/constants/app';
import { IConversationsService } from './interfaces/conversations-service.interface';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { AuthUser, TAuthUserOutput } from 'src/utils/decorators/auth-user';

@Controller(ROUTES.CONVERSATIONS.INDEX)
export class ConversationsController {
  constructor(
    @Inject(SERVICES.CONVERSATIONS)
    private readonly conversationsService: IConversationsService,
  ) {}

  @Get()
  getConversations(@AuthUser() user: TAuthUserOutput) {
    return this.conversationsService.getConversations(user.userId);
  }

  @Get(':conversationId')
  getConversation(
    @AuthUser() user: TAuthUserOutput,
    @Param('conversationId') conversationId: string,
  ) {
    return this.conversationsService.getConversation(
      conversationId,
      user.userId,
    );
  }

  @Post()
  create(
    @AuthUser() user: TAuthUserOutput,
    @Body() body: CreateConversationDto,
  ) {
    const { usernames } = body;
    return this.conversationsService.create({
      ownerUsername: user.username,
      usernames,
    });
  }
}
