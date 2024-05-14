import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { LogoutReq } from 'apps/user-svc/proto/builds/user_svc';

export class LogoutDto implements LogoutReq {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  agent: string;
}
