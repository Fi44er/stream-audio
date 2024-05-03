import { Module } from '@nestjs/common';
import { UserSvcController } from './user-svc.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_SERVICE_NAME } from 'proto/builds/user_svc';
import { resolve } from 'path';
import { UserSvcService } from './user-svc.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:3001',
          package: 'user_svc',
          protoPath: resolve(__dirname, '../../proto/user_svc.proto'),
        },
      },
    ]),
  ],
  controllers: [UserSvcController],
  providers: [UserSvcService],
  exports: [UserSvcService],
})
export class UserSvcModule {}
