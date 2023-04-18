import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { REPOSITORIES, SERVICES } from 'src/utils/constants/app';
import { ConversationsRepository } from './conversations.repository';
import { UsersModule } from 'src/users/users.module';
import { IsExistingUser } from './validators/users-exists';

@Module({
  imports: [UsersModule],
  providers: [
    {
      provide: SERVICES.CONVERSATIONS,
      useClass: ConversationsService,
    },
    {
      provide: REPOSITORIES.CONVERSATIONS,
      useClass: ConversationsRepository,
    },
    IsExistingUser,
  ],
  controllers: [ConversationsController],
})
export class ConversationsModule {}
