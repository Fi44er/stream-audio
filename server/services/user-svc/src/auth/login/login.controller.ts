import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { LoginReq, StatusRes } from 'proto/builds/user_svc';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @GrpcMethod('UserService', 'Login')
  async login(dto: LoginReq): Promise<StatusRes> {
    return this.loginService.login(dto);
  }
}
