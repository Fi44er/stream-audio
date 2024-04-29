import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RefreshingReq } from 'proto/user_svc';
import { RefreshService } from './refresh.service';

@Controller('refresh')
export class RefreshController {
  constructor(private readonly refreshService: RefreshService) {}

  @GrpcMethod('UserService', 'refreshingToken')
  async refreshingToken(dto: RefreshingReq): Promise<any> {
    return await this.refreshService.refreshToken(dto);
  }
}
