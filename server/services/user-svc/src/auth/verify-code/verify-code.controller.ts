import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { AccessTokenRes, VerifyCodeReq } from 'proto/builds/user_svc';
import { VerifyCodeService } from './verify-code.service';

@Controller('verify-code')
export class VerifyCodeController {
  constructor(private readonly verifyCodeService: VerifyCodeService) {}

  @GrpcMethod('UserService', 'VerifyCode')
  async verifyCode(dto: VerifyCodeReq): Promise<AccessTokenRes> {
    return this.verifyCodeService.verifyCode(dto);
  }
}
