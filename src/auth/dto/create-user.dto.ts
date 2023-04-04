import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserFieldAvailable } from 'src/utils/validators/user-field-available';

export class CreateUserDto {
  @IsNotEmpty()
  @UserFieldAvailable({ message: 'Username already taken' })
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @UserFieldAvailable({ message: 'Email already taken' })
  email: string;
}
