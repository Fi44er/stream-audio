import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { RegisterReq } from 'proto/builds/user_svc';

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
