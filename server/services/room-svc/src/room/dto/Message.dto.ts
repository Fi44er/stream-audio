import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Message } from 'proto/builds/room_svc';

export class MessageDto implements Message {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  roomId: string;
}