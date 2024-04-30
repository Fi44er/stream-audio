import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  JwtPayload,
  USER_SERVICE_NAME,
  UserServiceClient,
  VerifyTokenReq,
} from 'proto/user_svc';

@Injectable()
export class RoomService {
  constructor(@Inject(USER_SERVICE_NAME) private readonly client: ClientGrpc) {}
  async callVerifyToken(token: VerifyTokenReq): Promise<JwtPayload> {
    const client = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
    return await client.verifyAccessToken(token).toPromise();
  }
}
