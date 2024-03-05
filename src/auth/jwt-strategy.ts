import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './types/jwt-payload.type';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger('JwtGuard');
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    console.log('jwt-strategy');
    return { userId: payload.sub, username: payload.username };
  }

  handleRequest(
    ...args: Parameters<
      ReturnType<typeof AuthGuard>['prototype']['handlerequest']
    >
  ) {
    console.log('kurakke');
    this.logger.error(args);
    return args[0], args[1], args[2], args[3] as any, args[4];
  }
}
