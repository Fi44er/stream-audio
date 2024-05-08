import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { ValidationPipeWithRpcException } from 'lib/pipe/validationPipeWithRpcException';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:3003',
        package: 'chat_svc',
        protoPath: join(__dirname, '../proto/chat_svc.proto'),
      },
    },
  );
  app.useGlobalPipes(ValidationPipeWithRpcException());
  app.listen();
  console.log('Chat service is running on port 3003');
}
bootstrap();
