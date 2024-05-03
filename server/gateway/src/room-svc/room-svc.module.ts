import { Module } from '@nestjs/common';
import { RoomSvcService } from './room-svc.service';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ROOM_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:3001',
          package: 'user_svc',
          protoPath: resolve(__dirname, '../../proto/user_svc.proto'),
        },
      },
    ]),
  ],
  providers: [RoomSvcService],
})
export class RoomSvcModule {}
