import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSvcModule } from './user-svc/user-svc.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GrpcErrorInterceptor } from 'apps/gateway/lib/interceptors/grpcExceptionFilter.interceptor';
import { RoomSvcModule } from './room-svc/room-svc.module';
import { SocketModule } from './socket/socket.module';
import { ChatSvcModule } from './chat-svc/chat-svc.module';

@Module({
  imports: [UserSvcModule, RoomSvcModule, SocketModule, ChatSvcModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: GrpcErrorInterceptor },
  ],
})
export class AppModule {}
