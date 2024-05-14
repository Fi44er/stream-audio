import { Module } from '@nestjs/common';
import { AudioService } from './audio.service';
import { AudioController } from './audio.controller';
import { AudioGateway } from './audio.gateway';

@Module({
  controllers: [AudioController],
  providers: [AudioService, AudioGateway],
})
export class AudioModule {}
