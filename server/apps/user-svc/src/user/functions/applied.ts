import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { status } from '@grpc/grpc-js';
import { PrismaService } from '../../prisma/prisma.service';

export const hashingPassword = (password: string): string => {
  if (!password)
    throw new RpcException({
      message: 'Пароль не может быть пустым',
      code: status.INVALID_ARGUMENT,
    });
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const existUser = async (
  email: string,
  prismaService: PrismaService,
): Promise<boolean> => {
  const existUser = await prismaService.user.findFirst({
    where: { email: email },
  });
  if (existUser)
    throw new RpcException({
      message: 'Пользователь с такой почтой уже существует',
      code: status.ALREADY_EXISTS,
    });
  return true;
};

// --- Корректна ли почта --- //
export const correctEmail = (email: string): boolean => {
  const emilRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emilRegx.test(email))
    throw new RpcException({
      message: 'Некорректная почта',
      code: status.INVALID_ARGUMENT,
    });
  return true;
};
