import { NestFactory } from '@nestjs/core';
import { AudioSvcModule } from './audio-svc.module';

async function bootstrap() {
  const app = await NestFactory.create(AudioSvcModule);
  await app.listen(3000);
}
bootstrap();
