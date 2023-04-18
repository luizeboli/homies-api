import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import { AuthenticatedSocketIoAdapter } from './websocket/websocket.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(ClerkExpressWithAuth({ jwtKey: process.env.CLERK_JWT_PUBLIC_KEY }));
  app.useWebSocketAdapter(new AuthenticatedSocketIoAdapter(app));

  // enable DI for class-validator
  // this is an important step so we can inject app dependencies on custom validators
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT);
}
bootstrap();
