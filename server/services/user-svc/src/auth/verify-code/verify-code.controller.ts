import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { AccessTokenRes } from 'proto/builds/user_svc';
import { VerifyCodeService } from './verify-code.service';
import { VerifyCodeDto } from '../dto/VerifyCode.dto';

@Controller('verify-code')
export class VerifyCodeController {
  constructor(private readonly verifyCodeService: VerifyCodeService) {}

  @GrpcMethod('UserService', 'VerifyCode')
  async verifyCode(dto: VerifyCodeDto): Promise<AccessTokenRes> {
    return this.verifyCodeService.verifyCode(dto);
  }
}
