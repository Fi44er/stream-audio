import { IsString } from 'class-validator';
import {
  AccessToken,
  RefreshingReq,
} from 'apps/user-svc/proto/builds/user_svc';

export class RefreshTokenDto implements RefreshingReq {
  accessToken: AccessToken | undefined;

  @IsString()
  agent: string;
}
