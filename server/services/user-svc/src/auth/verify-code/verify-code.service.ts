import { status } from '@grpc/grpc-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { GenerateTokensService } from 'lib/utils/generate-tokens/generate-tokens.service';
import { AccessTokenRes, VerifyCodeReq } from 'proto/builds/user_svc';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class VerifyCodeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly generateTokensService: GenerateTokensService,
    private readonly userService: UserService,
  ) {}

  async verifyCode(dto: VerifyCodeReq): Promise<AccessTokenRes> {
    const existCode = await this.prismaService.verificationCode.findFirst({
      where: { email: dto.body.email },
    });
    if (!existCode)
      throw new RpcException({
        message: 'Отправить код верификации повторно',
        code: status.INVALID_ARGUMENT,
      });

    const codeExp = await this.configService.get('CODE_EXP');
    const codeDate = new Date(existCode.createdAt);
    codeDate.setMinutes(codeDate.getMinutes() + +codeExp);
    const dateNow = new Date(Date.now());
    if (codeDate < dateNow)
      throw new RpcException({
        message: 'Код верификации истек',
        code: status.INVALID_ARGUMENT,
      });

    if (dto.body.code !== existCode.code)
      throw new RpcException({
        message: 'Неверный код верификации',
        code: status.INVALID_ARGUMENT,
      });

    const existUser = await this.prismaService.user.findUnique({
      where: { email: dto.body.email },
    });
    await this.prismaService.verificationCode.delete({
      where: { email: dto.body.email },
    });

    if (!existUser) {
      const user = await this.userService.save({
        email: dto.body.email,
        password: dto.body.password,
      });
      const token = await this.generateTokensService.generateTokens(
        user,
        dto.agent,
      );
      return token;
    }

    const token = await this.generateTokensService.generateTokens(
      existUser,
      dto.agent,
    );
    return token;
  }
}
