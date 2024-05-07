import { IsNotEmpty, IsNumber } from 'class-validator';
import { UserId } from 'proto/builds/room_svc';

export class UserIdDto implements UserId {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
