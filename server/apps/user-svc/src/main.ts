import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { ValidationPipeWithRpcException } from '../lib/pipe/validationPipeWithRpcException';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:3001',
        package: 'user_svc',
        protoPath: join(__dirname, '../proto/user_svc.proto'),
      },
    },
  );
  app.useGlobalPipes(ValidationPipeWithRpcException());
  app.listen();
  console.log('User service is running on port 3001');
}
bootstrap();
