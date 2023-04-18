import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { IUsersService } from 'src/users/interface/users-service.interface';
import { ROUTES, SERVICES } from 'src/utils/constants/app';
import { PublicRoute } from 'src/utils/decorators/public-route';
import { WebhookDto } from './dto/webhook.dto';
import { VerifyWebhookGuard } from './guards/verify-webhook.guard';
import { WEBHOOK_EVENT_TYPES } from 'src/utils/constants/webhook';

@UseGuards(VerifyWebhookGuard)
@Controller(ROUTES.WEBHOOK.INDEX)
export class WebhookController {
  constructor(@Inject(SERVICES.USERS) private usersService: IUsersService) {}

  @PublicRoute()
  @Post()
  webhook(@Body() webhookDto: WebhookDto) {
    const { type, data } = webhookDto;

    if (type === WEBHOOK_EVENT_TYPES.USER_CREATED)
      return this.usersService.createUser(data);

    throw new Error('Not implemented');
  }
}
