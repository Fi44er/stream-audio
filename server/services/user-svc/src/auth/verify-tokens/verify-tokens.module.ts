import { Module } from '@nestjs/common';
import { VerifyTokensService } from './verify-tokens.service';
import { VerifyTokensController } from './verify-tokens.controller';

@Module({
  controllers: [VerifyTokensController],
  providers: [VerifyTokensService],
})
export class VerifyTokensModule {}
