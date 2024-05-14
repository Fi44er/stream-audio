import { Module } from '@nestjs/common';
import { GenerateTokensModule } from 'apps/user-svc/lib/utils/generate-tokens/generate-tokens.module';
import { UserModule } from 'apps/user-svc/src/user/user.module';
import { RefreshController } from './refresh.controller';
import { RefreshService } from './refresh.service';

@Module({
  imports: [UserModule, GenerateTokensModule],
  controllers: [RefreshController],
  providers: [RefreshService],
})
export class RefreshModule {}
