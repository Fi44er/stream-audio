import { IsNotEmpty, IsString } from 'class-validator';
import { FindUSerReq } from 'proto/builds/user_svc';

export class FindUserDto implements FindUSerReq {
  @IsNotEmpty()
  @IsString()
  idOrEmail: string;
}
