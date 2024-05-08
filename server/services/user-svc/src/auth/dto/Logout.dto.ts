import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { LogoutReq } from 'proto/builds/user_svc';

export class LogoutDto implements LogoutReq {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  agent: string;
}
