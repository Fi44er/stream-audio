import { Controller } from '@nestjs/common';
import { VerifyTokensService } from './verify-tokens.service';
import { GrpcMethod } from '@nestjs/microservices';
import { VerifyTokenDto } from '../dto/VerifyToken.dto';
import { JwtPayload } from 'apps/user-svc/proto/builds/user_svc';

@Controller()
export class VerifyTokensController {
  constructor(private readonly verifyTokensService: VerifyTokensService) {}

  @GrpcMethod('UserService', 'verifyAccessToken')
  async verifyAccessToken(token: VerifyTokenDto): Promise<JwtPayload> {
    return this.verifyTokensService.verifyAccessToken(token.token);
  }
}
