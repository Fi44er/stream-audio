import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  FindUSerReq,
  JwtPayload,
  USER_SERVICE_NAME,
  UserRes,
  UserServiceClient,
  VerifyTokenReq,
} from 'proto/user_svc';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  private userClient: UserServiceClient;

  constructor(@Inject(USER_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userClient =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async verifyAccessToken(
    token: VerifyTokenReq,
  ): Promise<Observable<JwtPayload>> {
    return this.userClient.verifyAccessToken(token);
  }

  async findOne(idOrEmail: FindUSerReq): Promise<Observable<UserRes>> {
    return this.userClient.findUser(idOrEmail);
  }
}
