import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RoomUser } from 'apps/room-svc/proto/builds/room_svc';

export class RoomUserDto implements RoomUser {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  roomId: string;
}
