import { status } from '@grpc/grpc-js';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { generateAndSendVerifyCode } from 'apps/user-svc/lib/utils/verify-code/generate-and-send-verify-code.util';
import { RegisterReq, StatusRes } from 'apps/user-svc/proto/builds/user_svc';
import { EmailerService } from 'apps/user-svc/src/mailer/emailer.service';
import { PrismaService } from 'apps/user-svc/src/prisma/prisma.service';

@Injectable()
export class RegisterService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly emailerService: EmailerService,
  ) {}

  async register(dto: RegisterReq): Promise<StatusRes> {
    // проверка на существующего пользователя
    const existUser = await this.prismaService.user.findFirst({
      where: { email: dto.email },
    });
    if (existUser)
      throw new RpcException({
        message: 'Пользователь с такой почтой уже существует',
        code: status.ALREADY_EXISTS,
      });

    // проверка паролей на совпадение
    if (dto.password !== dto.passwordRepeat)
      throw new RpcException({
        message: 'Пароли не совпадают',
        code: status.INVALID_ARGUMENT,
      });

    // генерация и отправка кода верификации
    const services = {
      prismaService: this.prismaService,
      emailerService: this.emailerService,
    };
    await generateAndSendVerifyCode(dto.email, services);
    return { status: true };
  }
}
