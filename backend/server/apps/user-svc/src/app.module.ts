import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EmailerModule } from './mailer/emailer.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    EmailerModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
