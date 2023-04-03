import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Inject,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from './utils/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { PublicRoute } from 'src/utils/public-route';
import { SERVICES } from 'src/utils/constants/app';
import { IUsersService } from 'src/users/interfaces/users-service.interface';
import { AuthUser } from 'src/utils/decorators/auth-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(@Inject(SERVICES.USERS) private usersService: IUsersService) {}

  @PublicRoute()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  login() {
    return 'OK';
  }

  @PublicRoute()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return new UserEntity(await this.usersService.create(createUserDto));
  }

  @Post('status')
  @HttpCode(200)
  status(@AuthUser() user: UserEntity) {
    return new UserEntity(user);
  }
}
