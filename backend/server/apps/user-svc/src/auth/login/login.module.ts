import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UserModule } from 'apps/user-svc/src/user/user.module';
import { GenerateTokensModule } from 'apps/user-svc/lib/utils/generate-tokens/generate-tokens.module';
import { EmailerModule } from 'apps/user-svc/src/mailer/emailer.module';

@Module({
  imports: [EmailerModule, UserModule, GenerateTokensModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
