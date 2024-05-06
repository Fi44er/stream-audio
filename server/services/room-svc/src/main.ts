import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
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
  app.listen();
  console.log('Room service is running on port 3002');
}
bootstrap();
