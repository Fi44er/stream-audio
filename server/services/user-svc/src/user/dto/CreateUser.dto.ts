import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserReq } from 'proto/builds/user_svc';

export class CreateUserDto implements CreateUserReq {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
