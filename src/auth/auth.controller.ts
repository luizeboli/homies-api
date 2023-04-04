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
import { ROUTES, SERVICES } from 'src/utils/constants/app';
import { IUsersService } from 'src/users/interfaces/users-service.interface';
import { AuthUser } from 'src/utils/decorators/auth-user.decorator';

@Controller(ROUTES.AUTH.INDEX)
export class AuthController {
  constructor(@Inject(SERVICES.USERS) private usersService: IUsersService) {}

  @PublicRoute()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post(ROUTES.AUTH.LOGIN)
  login() {
    return 'OK';
  }

  @PublicRoute()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post(ROUTES.AUTH.REGISTER)
  async register(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return new UserEntity(await this.usersService.create(createUserDto));
  }

  @Post(ROUTES.AUTH.STATUS)
  @HttpCode(200)
  status(@AuthUser() user: UserEntity) {
    return new UserEntity(user);
  }
}
