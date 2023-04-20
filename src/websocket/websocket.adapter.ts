import { IoAdapter } from '@nestjs/platform-socket.io';
import { IncomingMessage } from 'http';
import { ServerOptions } from 'socket.io';
import * as cookie from 'cookie';
import * as jose from 'jose';

export class AuthenticatedSocketIoAdapter extends IoAdapter {
  private async validateSession(sessionCookie: string) {
    const splitPem = process.env.CLERK_JWT_PUBLIC_KEY.match(/.{1,64}/g);
    const spki =
      '-----BEGIN PUBLIC KEY-----\n' +
      splitPem?.join('\n') +
      '\n-----END PUBLIC KEY-----';

    const alg = 'RS256';
    const publicKey = await jose.importSPKI(spki, alg);
    await jose.jwtVerify(sessionCookie, publicKey);
  }

  createIOServer(port: number, options: ServerOptions) {
    options.allowRequest = async (req: IncomingMessage, callback) => {
      if (!req.headers.cookie) return callback(null, false);

      const { __session } = cookie.parse(req.headers.cookie);
      if (!__session) return callback(null, false);

      try {
        await this.validateSession(__session);
        return callback(null, true);
      } catch (error) {
        return callback(error.message, false);
      }
    };

    return super.createIOServer(port, options);
  }
}
