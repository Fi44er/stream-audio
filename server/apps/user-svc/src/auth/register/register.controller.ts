import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { StatusRes } from 'apps/user-svc/proto/builds/user_svc';
import { RegisterService } from './register.service';
import { RegisterDto } from '../dto/Register.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  // -- POST -- //
  @GrpcMethod('UserService', 'Register')
  async register(dto: RegisterDto): Promise<StatusRes> {
    return this.registerService.register(dto);
  }
}
