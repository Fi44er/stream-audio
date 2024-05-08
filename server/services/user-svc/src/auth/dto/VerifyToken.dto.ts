import { IsNotEmpty, IsString } from 'class-validator';
import { VerifyTokenReq } from 'proto/builds/user_svc';

export class VerifyTokenDto implements VerifyTokenReq {
  @IsNotEmpty()
  @IsString()
  token: string;
}
