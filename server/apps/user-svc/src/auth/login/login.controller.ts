import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { StatusRes } from 'apps/user-svc/proto/builds/user_svc';
import { LoginService } from './login.service';
import { LoginDto } from '../dto/Login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @GrpcMethod('UserService', 'Login')
  async login(dto: LoginDto): Promise<StatusRes> {
    return this.loginService.login(dto);
  }
}
