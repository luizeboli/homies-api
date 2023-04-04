import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { UserExist } from 'src/utils/validators/user-exists';

export class CreateConversationDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @UserExist({
    each: true,
    message: (user) => `User with id ${user.value} does not exist`,
  })
  usersIds: string[];
}
