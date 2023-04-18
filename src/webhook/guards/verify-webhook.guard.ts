import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  RawBodyRequest,
} from '@nestjs/common';
import { Webhook } from 'svix';
import { WebhookDto } from '../dto/webhook.dto';
import { Request } from 'express';

@Injectable()
export class VerifyWebhookGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<RawBodyRequest<Request>>();

    const svixSecret = process.env.SVIX_SECRET_KEY;
    const wh = new Webhook(svixSecret);

    const payload = request.rawBody?.toString('utf8');
    const headers = request.headers;

    try {
      wh.verify(payload ?? '', {
        'svix-id': headers['svix-id'] as string,
        'svix-timestamp': headers['svix-timestamp'] as string,
        'svix-signature': headers['svix-signature'] as string,
      }) as WebhookDto;
      return true;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
