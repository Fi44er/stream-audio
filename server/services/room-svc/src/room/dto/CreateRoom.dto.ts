import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsNumber()
  ownerId: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
