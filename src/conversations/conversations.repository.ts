import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IConversationsRepository } from './interfaces/conversations-repository.interface';
import {
  Conversation,
  ConversationCreateInput,
  FindUniqueByIdInclude,
} from './types';

@Injectable()
export class ConversationsRepository implements IConversationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ConversationCreateInput): Promise<Conversation> {
    const { ownerUsername, usernames } = data;

    return this.prisma.conversation.create({
      data: {
        owner: {
          connect: {
            username: ownerUsername,
          },
        },
        users: {
          connect: usernames.map((username) => ({ username })),
        },
      },
      include: {
        users: true,
        owner: true,
      },
    });
  }

  findByUserId(id: string): Promise<Conversation[]> {
    return this.prisma.conversation.findMany({
      where: {
        OR: [
          {
            users: {
              some: {
                id,
              },
            },
          },
          {
            ownerUserId: id,
          },
        ],
      },
      include: {
        users: true,
        owner: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findUniqueById(
    id: string,
    userId: string,
    include?: FindUniqueByIdInclude,
  ): Promise<Conversation | null> {
    return this.prisma.conversation.findUnique({
      where: {
        id,
        OR: [
          {
            ownerUserId: userId,
          },
          {
            users: {
              some: {
                id: userId,
              },
            },
          },
        ],
      },
      include: {
        users: true,
        owner: true,
        messages: include?.messages && {
          take: 50,
          orderBy: {
            createdAt: 'desc',
          },
        },
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
