import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LoginReq } from 'proto/builds/user_svc';

export class LoginDto implements LoginReq {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
