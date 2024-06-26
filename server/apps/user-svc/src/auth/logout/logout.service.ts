import { Injectable } from '@nestjs/common';
import { LogoutReq, StatusRes } from 'apps/user-svc/proto/builds/user_svc';
import { PrismaService } from 'apps/user-svc/src/prisma/prisma.service';

@Injectable()
export class LogoutService {
  constructor(private readonly prismaService: PrismaService) {}

  async logout(dto: LogoutReq): Promise<StatusRes> {
    const { agent, id } = dto;
    console.log(dto);

    const existToken = await this.prismaService.token.findFirst({
      where: {
        userAgent: agent,
        userId: id,
      },
    });

    if (!existToken) return { status: true };

    await this.prismaService.token.delete({
      where: {
        token: existToken.token,
      },
    });
    return { status: true };
  }
}
