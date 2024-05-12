import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { options } from 'apps/user-svc/src/auth/shared/config';
import { GenerateTokensService } from './generate-tokens.service';

@Module({
  imports: [JwtModule.registerAsync(options())],
  controllers: [],
  providers: [GenerateTokensService],
  exports: [GenerateTokensService],
})
export class GenerateTokensModule {}
