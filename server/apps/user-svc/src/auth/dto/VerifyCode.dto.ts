import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { VerifyCodeReq } from 'apps/user-svc/proto/builds/user_svc';

export class VerifyCodeDto implements VerifyCodeReq {
  body: VerifyCodeBody;

  @IsNotEmpty()
  @IsString()
  agent: string;
}

class VerifyCodeBody {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  code: number;
}
