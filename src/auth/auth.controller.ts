import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from './utils/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from './entities/user.entity';
import { PublicRoute } from 'src/utils/public-route';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @PublicRoute()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Req() req: Request) {
    return new UserEntity(req.user as UserEntity);
  }

  @PublicRoute()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return new UserEntity(await this.usersService.create(createUserDto));
  }
}
