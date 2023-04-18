import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class UserData {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  username: string;
}

export class WebhookDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => UserData)
  data: UserData;

  @IsString()
  object: string;

  @IsString()
  type: string;
}
