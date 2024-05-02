import { IsNumber, IsString } from 'class-validator';

export class AddMessageDto {
  @IsString()
  message: string;

  @IsString()
  roomId: string;

  @IsNumber()
  userId: number;
}
