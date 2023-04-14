import { WithAuthProp } from '@clerk/clerk-sdk-node';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type TAuthUserOutput = {
  userId: string;
  username: string;
};

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<WithAuthProp<Request>>();
    const userId = request.auth.claims?.userId;
    const username = request.auth.claims?.username;
    return { userId, username };
  },
);
