import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { jwtPayload } from '../interfaces/jwt-payload.interface';
import { UserService } from 'src/user/user.service';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  private readonly logger = new Logger(JwtStrategy.name);

  async validate(payload: jwtPayload) {
    // payload токена(id, login, roles)
    const user = await this.userService
      .findUser(String(payload.id))
      .catch((err) => {
        this.logger.error(err);
        return null;
      });
    if (!user)
      throw new RpcException({
        message: 'Пользователь не найден',
        code: status,
      });
    return payload;
  }
}
