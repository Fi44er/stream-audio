import { Controller } from '@nestjs/common';
import { VerifyTokensService } from './verify-tokens.service';
import { GrpcMethod } from '@nestjs/microservices';
import { VerifyTokenReq } from 'proto/user_svc';

@Controller()
export class VerifyTokensController {
  constructor(private readonly verifyTokensService: VerifyTokensService) {}

  @GrpcMethod('UserService', 'verifyAccessToken')
  async verifyAccessToken(token: VerifyTokenReq) {
    return this.verifyTokensService.verifyAccessToken(token.token);
  }
}
