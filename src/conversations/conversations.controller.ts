import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
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
  async getConversation(
    @AuthUser() user: User,
    @Param('conversationId') conversationId: string,
  ) {
    const conversation = await this.conversationsService.getConversation(
      conversationId,
      user.id,
    );
    if (!conversation) {
      throw new HttpException('Conversation not found', HttpStatus.NOT_FOUND);
    }
    return conversation;
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
