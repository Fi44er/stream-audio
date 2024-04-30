import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Token, User } from '@prisma/client';
import { add } from 'date-fns';
import { AccessTokenRes } from 'proto/user_svc';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';
import { convertToSecondsUtil } from '../convert-to-seconds';

@Injectable()
export class GenerateTokensService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  // Генерация пары accsess и refresh токенов
  async generateTokens(user: User, agent: string): Promise<AccessTokenRes> {
    const accessToken =
      'Bearer ' +
      this.jwtService.sign({
        id: user.id,
        login: user.email,
        role: user.role,
      });
    this.setRefreshToken(user.id, agent);
    const accessExp = convertToSecondsUtil(this.configService.get('JWT_EXP'));
    return { accessToken: { token: accessToken, exp: accessExp } };
  }

  // Генерация refresh токена
  private async setRefreshToken(userId: number, agent: string): Promise<Token> {
    const _token = await this.prismaService.token.findFirst({
      where: { userId, userAgent: agent },
    });
    const token = _token?.token ?? '';

    return this.prismaService.token.upsert({
      where: { token },
      update: {
        token: v4(),
        exp: _token?.exp ?? add(new Date(), { months: 1 }),
      },
      create: {
        token: v4(),
        exp: add(new Date(), { months: 1 }),
        userId,
        userAgent: agent,
      },
    });
  }
}
