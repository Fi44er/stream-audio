import { Module } from '@nestjs/common';
import { VerifyTokensService } from './verify-tokens.service';
import { VerifyTokensController } from './verify-tokens.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [VerifyTokensController],
  providers: [VerifyTokensService, JwtService],
})
export class VerifyTokensModule {}
