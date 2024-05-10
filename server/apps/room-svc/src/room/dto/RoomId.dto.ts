import { IsNotEmpty, IsString } from 'class-validator';
import { RoomId } from 'apps/room-svc/proto/builds/room_svc';

export class RoomIdDto implements RoomId {
  @IsNotEmpty()
  @IsString()
  roomId: string;
}
