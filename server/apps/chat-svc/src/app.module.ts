import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ChatModule, PrismaModule],
})
export class AppModule {}
