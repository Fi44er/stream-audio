import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UserModule } from 'src/user/user.module';
import { GenerateTokensModule } from 'lib/utils/generate-tokens/generate-tokens.module';
import { EmailerModule } from 'src/mailer/emailer.module';

@Module({
  imports: [EmailerModule, UserModule, GenerateTokensModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
