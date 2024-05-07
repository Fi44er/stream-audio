import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSvcModule } from './user-svc/user-svc.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GrpcErrorInterceptor } from 'lib/interceptors/grpcExceptionFilter.interceptor';
import { RoomSvcModule } from './room-svc/room-svc.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [UserSvcModule, RoomSvcModule, SocketModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: GrpcErrorInterceptor },
  ],
})
export class AppModule {}
