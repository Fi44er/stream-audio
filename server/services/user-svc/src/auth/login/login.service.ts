import { status } from '@grpc/grpc-js';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { compareSync } from 'bcrypt';
import { generateAndSendVerifyCode } from 'lib/utils/verify-code/generate-and-send-verify-code.util';
import { LoginReq, StatusRes } from 'proto/user_svc';
import { EmailerService } from 'src/mailer/emailer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly emailerService: EmailerService,
  ) {}

  async login(dto: LoginReq): Promise<StatusRes> {
    const existUser = await this.userService.findUser(dto.email);
    if (!existUser || !compareSync(dto.password, existUser.password))
      throw new RpcException({
        message: 'Неверная почта или пароль',
        code: status.INVALID_ARGUMENT,
      });

    const services = {
      prismaService: this.prismaService,
      emailerService: this.emailerService,
    };
    await generateAndSendVerifyCode(dto.email, services);
    return { status: true };
  }
}
