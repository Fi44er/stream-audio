import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserDto } from './dto/CreateUser.dto';
import { FindUserDto } from './dto/FindUser.dto';
import { UserRes } from 'apps/user-svc/proto/builds/user_svc';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(user: CreateUserDto): Promise<UserRes> {
    return await this.userService.save(user);
  }

  @GrpcMethod('UserService', 'FindUser')
  async findOne(idOrLogin: FindUserDto): Promise<UserRes> {
    return await this.userService.findUser(idOrLogin.idOrEmail);
  }
}
