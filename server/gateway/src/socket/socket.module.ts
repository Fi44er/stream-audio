import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { RoomSvcModule } from 'src/room-svc/room-svc.module';
import { UserSvcModule } from 'src/user-svc/user-svc.module';
import { ChatSvcModule } from 'src/chat-svc/chat-svc.module';

@Module({
  imports: [RoomSvcModule, UserSvcModule, ChatSvcModule],
  providers: [SocketGateway, SocketService],
})
export class SocketModule {}
