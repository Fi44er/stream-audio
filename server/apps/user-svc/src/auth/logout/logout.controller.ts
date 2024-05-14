import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { StatusRes } from 'apps/user-svc/proto/builds/user_svc';
import { LogoutService } from './logout.service';
import { LogoutDto } from '../dto/Logout.dto';

@Controller()
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}

  @GrpcMethod('UserService', 'Logout')
  async logoutUser(dto: LogoutDto): Promise<StatusRes> {
    return this.logoutService.logout(dto);
  }
}
