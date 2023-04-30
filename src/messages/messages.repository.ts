import { Injectable } from '@nestjs/common';
import { IMessagesRepository } from './interfaces/messages-repository.interface';
import { Message } from './entities/message.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageCreateInput, MessageFindInput } from './types';

@Injectable()
export class MessagesRepository implements IMessagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(input: MessageCreateInput): Promise<Message> {
    const {
      conversationId,
      data: { content },
      userId,
    } = input;
    return this.prisma.message.create({
      data: {
        content,
        conversationId,
        authorId: userId,
      },
      include: {
        author: true,
      },
    });
  }

  find(data: MessageFindInput): Promise<Message[]> {
    const { conversationId, cursor, take } = data;

    return this.prisma.message.findMany({
      where: {
        conversationId,
      },
      include: {
        author: true,
      },
      take,
      skip: cursor ? 1 : 0,
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
