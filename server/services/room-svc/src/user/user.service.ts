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
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  private userClient: UserServiceClient;

  constructor(@Inject(USER_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userClient =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async verifyAccessToken(token: VerifyTokenReq): Promise<JwtPayload> {
    const observablePayload = this.userClient.verifyAccessToken(token);
    const payload: Promise<JwtPayload> = firstValueFrom(observablePayload)
      .then((jwtPayload: JwtPayload) => {
        return jwtPayload;
      })
      .catch(() => {
        return;
      }) as Promise<JwtPayload>;

    return payload;
  }

  async findOne(idOrEmail: FindUSerReq): Promise<UserRes> {
    const observableUser = this.userClient.findUser(idOrEmail);
    const user = firstValueFrom(observableUser).then((user) => {
      return user;
    });
    return user;
  }
}
