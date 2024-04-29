import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { options } from 'src/auth/shared/config';

@Module({
  imports: [JwtModule.registerAsync(options())],
  controllers: [],
  providers: [TokensService],
  exports: [TokensService],
})
export class GenerateTokensModule {}
