import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserReq, FindUSerReq, UserRes } from 'proto/builds/user_svc';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(user: CreateUserReq): Promise<UserRes> {
    return await this.userService.save(user);
  }

  @GrpcMethod('UserService', 'FindUser')
  async findOne(idOrLogin: FindUSerReq): Promise<UserRes> {
    return await this.userService.findUser(idOrLogin.idOrEmail);
  }
}
