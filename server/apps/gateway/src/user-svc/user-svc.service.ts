import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { rpcErrorHandling$ } from 'apps/gateway/lib/utils/rpcErrorHandling';
import {
  FindUSerReq,
  JwtPayload,
  USER_SERVICE_NAME,
  UserRes,
  UserServiceClient,
  VerifyTokenReq,
} from 'apps/gateway/proto/builds/user_svc';

@Injectable()
export class UserSvcService implements OnModuleInit {
  private userClient: UserServiceClient;

  constructor(@Inject(USER_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userClient =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async verifyAccessToken(token: VerifyTokenReq): Promise<JwtPayload> {
    const observablePayload = this.userClient.verifyAccessToken(token);
    return rpcErrorHandling$(observablePayload);
  }

  async findOne(idOrEmail: FindUSerReq): Promise<UserRes> {
    const observableUser = this.userClient.findUser(idOrEmail);
    const user = rpcErrorHandling$(observableUser);
    return user;
  }
}
