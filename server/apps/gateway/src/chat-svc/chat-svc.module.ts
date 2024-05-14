import { Module } from '@nestjs/common';
import { ChatSvcService } from './chat-svc.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { resolve } from 'path';
import { CHAT_SERVICE_NAME } from 'apps/gateway/proto/builds/chat_svc';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CHAT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:3003',
          package: 'chat_svc',
          protoPath: resolve(__dirname, '../../proto/chat_svc.proto'),
        },
      },
    ]),
  ],
  providers: [ChatSvcService],
  exports: [ChatSvcService],
})
export class ChatSvcModule {}
