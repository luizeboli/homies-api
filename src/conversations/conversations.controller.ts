import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ROUTES, SERVICES } from 'src/utils/constants/app';
import { IConversationsService } from './interfaces/conversations-service.interface';
import { AuthUser } from 'src/utils/decorators/auth-user.decorator';
import { User } from 'src/users/types';
import { CreateConversationDto } from './dto/create-conversation.dto';

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

  @Post()
  create(@AuthUser() user: User, @Body() body: CreateConversationDto) {
    const { usersIds } = body;
    return this.conversationsService.create({ ownerId: user.id, usersIds });
  }
}
