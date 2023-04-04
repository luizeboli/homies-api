import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IConversationsRepository } from './interfaces/conversations-repository.interface';
import {
  Conversation,
  ConversationCreateInput,
  ConversationFindManyInput,
} from './types';

@Injectable()
export class ConversationsRepository implements IConversationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ConversationCreateInput): Promise<Conversation> {
    const { ownerId, userIds } = data;
    return this.prisma.conversation.create({
      data: {
        ownerId,
        users: {
          connect: [
            { id: ownerId },
            ...userIds.map((userId) => ({ id: userId })),
          ],
        },
      },
      include: {
        users: true,
      },
    });
  }

  findMany(where: ConversationFindManyInput = {}): Promise<Conversation[]> {
    return this.prisma.conversation.findMany({
      where,
      include: {
        users: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.conversation.delete({
      where: {
        id,
      },
    });
  }
}
