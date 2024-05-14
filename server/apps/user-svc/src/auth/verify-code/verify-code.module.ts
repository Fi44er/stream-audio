import { Module } from '@nestjs/common';
import { VerifyCodeService } from './verify-code.service';
import { VerifyCodeController } from './verify-code.controller';
import { UserModule } from '../../user/user.module';
import { GenerateTokensModule } from 'apps/user-svc/lib/utils/generate-tokens/generate-tokens.module';

@Module({
  imports: [UserModule, GenerateTokensModule],
  controllers: [VerifyCodeController],
  providers: [VerifyCodeService],
})
export class VerifyCodeModule {}
