import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { VerifyCodeService } from './verify-code.service';
import { VerifyCodeDto } from '../dto/VerifyCode.dto';
import { AccessTokenRes } from 'apps/user-svc/proto/builds/user_svc';

@Controller('verify-code')
export class VerifyCodeController {
  constructor(private readonly verifyCodeService: VerifyCodeService) {}

  @GrpcMethod('UserService', 'VerifyCode')
  async verifyCode(dto: VerifyCodeDto): Promise<AccessTokenRes> {
    return this.verifyCodeService.verifyCode(dto);
  }
}
