import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { EmailerModule } from 'apps/user-svc/src/mailer/emailer.module';
import { UserModule } from 'apps/user-svc/src/user/user.module';
import { GenerateTokensModule } from 'apps/user-svc/lib/utils/generate-tokens/generate-tokens.module';
import { RegisterController } from './register.controller';

@Module({
  imports: [EmailerModule, UserModule, GenerateTokensModule],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
