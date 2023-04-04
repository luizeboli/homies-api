import { Prisma } from '@prisma/client';
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

  private formatConversationsFindManyWhere(
    rawWhere: ConversationFindManyInput,
  ) {
    const { ownerId, userId } = rawWhere;
    const where: Prisma.ConversationWhereInput = {};

    if (ownerId) {
      where.ownerId = ownerId;
    }

    if (userId) {
      where.users = {
        some: {
          id: userId,
        },
      };
    }

    return where;
  }

  findMany(rawWhere: ConversationFindManyInput = {}): Promise<Conversation[]> {
    const where = this.formatConversationsFindManyWhere(rawWhere);

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
