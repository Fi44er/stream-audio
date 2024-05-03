import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RegisterReq, StatusRes } from 'proto/builds/user_svc';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  // -- POST -- //
  @GrpcMethod('UserService', 'Register')
  async register(dto: RegisterReq): Promise<StatusRes> {
    return this.registerService.register(dto);
  }
}
