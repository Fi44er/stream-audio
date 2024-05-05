import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  MicroserviceOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:3002',
        package: 'room_svc',
        protoPath: join(__dirname, '../proto/room_svc.proto'),
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (error: ValidationError[] = []) => {
        const errorMessage: string[] = [];
        error[0].children.forEach(function (v) {
          const message: string[] = Object.values(v.constraints);
          errorMessage.push(...message);
        });
        return new RpcException({
          code: status.INVALID_ARGUMENT,
          message: errorMessage.join(','),
        });
      },
    }),
  );
  app.listen();
  console.log('Room service is running on port 3002');
}
bootstrap();
