import { IsNotEmpty, IsNumber } from 'class-validator';
import { UserId } from 'apps/room-svc/proto/builds/room_svc';

export class UserIdDto implements UserId {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
