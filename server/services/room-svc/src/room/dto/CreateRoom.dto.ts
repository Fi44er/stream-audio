import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateRoomReq } from 'proto/builds/room_svc';

export class CreateRoomDto implements CreateRoomReq {
  @IsNotEmpty()
  @IsNumber()
  ownerId: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
