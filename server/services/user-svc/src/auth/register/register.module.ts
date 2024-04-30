import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { EmailerModule } from 'src/mailer/emailer.module';
import { UserModule } from 'src/user/user.module';
import { GenerateTokensModule } from 'lib/utils/generate-tokens/generate-tokens.module';
import { RegisterController } from './register.controller';

@Module({
  imports: [EmailerModule, UserModule, GenerateTokensModule],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
