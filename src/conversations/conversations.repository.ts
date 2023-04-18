import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IConversationsRepository } from './interfaces/conversations-repository.interface';
import { Conversation, ConversationCreateInput } from './types';

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
          connect: [
            ...usernames.map((username) => ({ username })),
            { username: ownerUsername },
          ],
        },
      },
      include: {
        users: true,
      },
    });
  }

  findByUserId(id: string): Promise<Conversation[]> {
    return this.prisma.conversation.findMany({
      where: {
        users: {
          some: {
            id,
          },
        },
      },
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
