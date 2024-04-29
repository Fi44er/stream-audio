import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSvcModule } from './user-svc/user-svc.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GrpcErrorInterceptor } from 'lib/interceptors/GrpcExceptionFilter.interceptor';

@Module({
  imports: [UserSvcModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: GrpcErrorInterceptor },
  ],
})
export class AppModule {}
