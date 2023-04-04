import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateConversationDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  usersIds: string[];
}
