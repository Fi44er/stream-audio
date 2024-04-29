import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { LogoutReq, StatusRes } from 'proto/user_svc';
import { LogoutService } from './logout.service';

@Controller()
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}

  @GrpcMethod('UserService', 'Logout')
  async logoutUser(dto: LogoutReq): Promise<StatusRes> {
    return this.logoutService.logout(dto);
  }
}
