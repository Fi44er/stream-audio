import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { LogoutModule } from './logout/logout.module';
import { VerifyCodeModule } from './verify-code/verify-code.module';
import { RefreshModule } from './refresh/refresh.module';
import { RegisterModule } from './register/register.module';
import { VerifyTokensModule } from './verify-tokens/verify-tokens.module';

@Module({
  imports: [
    RegisterModule,
    LoginModule,
    LogoutModule,
    VerifyCodeModule,
    RefreshModule,
    VerifyTokensModule,
  ],
  controllers: [],
})
export class AuthModule {}
