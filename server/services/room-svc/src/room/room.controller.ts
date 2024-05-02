import { Body, Controller, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/createRoom.dto';
import { CreateRoomResponse } from './response/createRoom.response';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('create')
  async createRoom(@Body() dto: CreateRoomDto): Promise<CreateRoomResponse> {
    console.log(dto);

    return this.roomService.create(dto);
  }
}
