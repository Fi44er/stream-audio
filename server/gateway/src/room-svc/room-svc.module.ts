import { Module } from '@nestjs/common';
import { RoomSvcService } from './room-svc.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ROOM_SERVICE_NAME } from 'proto/builds/room_svc';
import { resolve } from 'path';
import { RoomSvcController } from './room-svc.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ROOM_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:3002',
          package: 'room_svc',
          protoPath: resolve(__dirname, '../../proto/room_svc.proto'),
        },
      },
    ]),
  ],
  providers: [RoomSvcService],
  controllers: [RoomSvcController],
  exports: [RoomSvcService],
})
export class RoomSvcModule {}
