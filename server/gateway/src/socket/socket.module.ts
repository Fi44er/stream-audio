import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { RoomSvcModule } from 'src/room-svc/room-svc.module';
import { UserSvcModule } from 'src/user-svc/user-svc.module';

@Module({
  imports: [RoomSvcModule, UserSvcModule],
  providers: [SocketGateway, SocketService],
})
export class SocketModule {}
