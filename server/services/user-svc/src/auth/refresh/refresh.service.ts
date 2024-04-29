import { status } from '@grpc/grpc-js';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as jwt from 'jsonwebtoken';
import { GenerateTokensService } from 'lib/utils/generate-tokens/generate-tokens.service';
import { RefreshingReq } from 'proto/user_svc';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RefreshService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly generateTokensService: GenerateTokensService,
  ) {}

  async refreshToken(dto: RefreshingReq) {
    if (!dto.accessToken)
      throw new RpcException({
        message: 'Пользователь не авторизирован',
        code: status.UNAUTHENTICATED,
      });
    const token = dto.accessToken.token.split('%20')[1];
    const decoded = jwt.decode(token);
    if (typeof decoded === 'string')
      throw new RpcException({
        message: 'Не валидный токен',
        code: status.INVALID_ARGUMENT,
      });
    const userId = decoded.id;
    const refreshToken = await this.prismaService.token.findFirst({
      where: {
        userId: userId,
        userAgent: dto.agent,
      },
    });

    if (!refreshToken)
      throw new RpcException({
        message: 'Пользователь не авторизирован',
        code: status.UNAUTHENTICATED,
      });
    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
    });
    return await this.generateTokensService.generateTokens(user, dto.agent);

    // const token = await this.prismaService.token.findFirst({ where: { token: refreshToken } });
  }
}
