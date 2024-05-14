import { IsNotEmpty, IsString } from 'class-validator';
import { VerifyTokenReq } from 'apps/user-svc/proto/builds/user_svc';

export class VerifyTokenDto implements VerifyTokenReq {
  @IsNotEmpty()
  @IsString()
  token: string;
}
