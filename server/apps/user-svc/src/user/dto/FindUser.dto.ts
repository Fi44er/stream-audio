import { FindUSerReq } from 'apps/user-svc/proto/builds/user_svc';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindUserDto implements FindUSerReq {
  @IsNotEmpty()
  @IsString()
  idOrEmail: string;
}
