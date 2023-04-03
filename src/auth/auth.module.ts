import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/local.strategy';
import { SessionSerializer } from './utils/session.serializer';
import { SERVICES } from 'src/utils/constants/app';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [
    {
      provide: SERVICES.AUTH,
      useClass: AuthService,
    },
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
