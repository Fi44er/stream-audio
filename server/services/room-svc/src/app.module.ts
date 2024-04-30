import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [RoomModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
