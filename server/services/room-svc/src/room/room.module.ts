import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomGateway } from './room.gateway';
import { UserModule } from 'src/user/user.module';
import { RoomController } from './room.controller';

@Module({
  imports: [UserModule],
  providers: [RoomGateway, RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
