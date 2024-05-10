import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { RegisterReq } from 'apps/user-svc/proto/builds/user_svc';

export class RegisterDto implements RegisterReq {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  passwordRepeat: string;
}
