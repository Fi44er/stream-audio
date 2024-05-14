import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Message } from 'apps/chat-svc/proto/builds/chat_svc';

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
