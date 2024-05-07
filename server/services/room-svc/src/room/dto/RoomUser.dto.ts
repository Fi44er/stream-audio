import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RoomUser } from 'proto/builds/room_svc';

export class RoomUserDto implements RoomUser {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  roomId: string;
}
