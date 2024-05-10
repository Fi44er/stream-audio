import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { correctEmail, existUser, hashingPassword } from './functions/applied';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserReq, UserRes } from 'apps/user-svc/proto/builds/user_svc';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  // ----- Сохранение пользователя ----- //

  async save(user: CreateUserReq) {
    correctEmail(user.email);
    await existUser(user.email, this.prismaService);

    const hashPassword = hashingPassword(user.password);
    return await this.prismaService.user.create({
      data: {
        email: user.email,
        password: hashPassword,
      },
    });
  }

  // ----- Поиск пользователя ----- //
  async findUser(idOrEmail: string): Promise<UserRes> {
    const pattern = /^[0-9]+$/;
    const userByDb = await this.prismaService.user.findFirst({
      where: {
        OR: [
          pattern.test(idOrEmail)
            ? { id: Number(idOrEmail) }
            : { email: String(idOrEmail) },
        ],
      },
    });

    if (!userByDb)
      throw new RpcException({
        message: 'Пользователь не найден',
        code: status.NOT_FOUND,
      });

    return userByDb;
  }
}
