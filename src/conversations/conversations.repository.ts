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
    const { ownerUsername, usernames } = data;

    const ownerConnectOrCreate = {
      create: { username: ownerUsername },
      where: {
        username: ownerUsername,
      },
    };

    const usernamesConnectOrCreate = usernames.map((username) => ({
      create: { username },
      where: {
        username,
      },
    }));

    return this.prisma.conversation.create({
      data: {
        owner: {
          connectOrCreate: ownerConnectOrCreate,
        },
        users: {
          connectOrCreate: [ownerConnectOrCreate, ...usernamesConnectOrCreate],
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
    const { ownerUsername, username } = rawWhere;
    const where: Prisma.ConversationWhereInput = {};

    if (ownerUsername) {
      where.ownerUsername = ownerUsername;
    }

    if (username) {
      where.users = {
        some: {
          username,
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
