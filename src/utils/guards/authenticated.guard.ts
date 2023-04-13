import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_ROUTE_KEY } from 'src/utils/decorators/public-route';
import { WithAuthProp } from '@clerk/clerk-sdk-node';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const isPublicRoute = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_ROUTE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublicRoute) return true;

    const request = context.switchToHttp().getRequest<WithAuthProp<Request>>();
    if (request.method === 'OPTIONS') return true;

    const authFromClerk = request.auth;
    if (!!authFromClerk.userId) return true;

    return false;
  }
}
