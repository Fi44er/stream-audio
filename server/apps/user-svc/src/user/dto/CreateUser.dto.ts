import { CreateUserReq } from 'apps/user-svc/proto/builds/user_svc';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto implements CreateUserReq {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
