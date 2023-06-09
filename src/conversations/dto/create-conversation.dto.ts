import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { UsersExist } from 'src/conversations/validators/users-exists';

export class CreateConversationDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @UsersExist({
    message: 'Invalid usernames',
  })
  usernames: string[];
}
