import { Module } from '@nestjs/common';
import { GenerateTokensModule } from 'lib/utils/generate-tokens/generate-tokens.module';
import { UserModule } from 'src/user/user.module';
import { RefreshController } from './refresh.controller';
import { RefreshService } from './refresh.service';

@Module({
  imports: [UserModule, GenerateTokensModule],
  controllers: [RefreshController],
  providers: [RefreshService],
})
export class RefreshModule {}
