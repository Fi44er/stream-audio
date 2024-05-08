import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateRoomRes, Room, RoomUser } from 'proto/builds/room_svc';
import { RoomService } from './room.service';
import { UserIdDto } from './dto/UserId.dto';
import { RoomUserDto } from './dto/RoomUser.dto';
import { RoomIdDto } from './dto/RoomId.dto';
import { CreateRoomDto } from './dto/CreateRoom.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @GrpcMethod('RoomService', 'CreateRoom')
  async createRoom(dto: CreateRoomDto): Promise<CreateRoomRes> {
    return this.roomService.createRoom(dto);
  }

  @GrpcMethod('RoomService', 'GetRoomUser')
  async getRoomUser(dto: UserIdDto): Promise<RoomUser> {
    return this.roomService.getRoomUser(dto);
  }

  @GrpcMethod('RoomService', 'FindOneWithRelations')
  async findOneWithRelations(dto: RoomIdDto): Promise<Room> {
    return this.roomService.findOneWithRelations(dto);
  }

  @GrpcMethod('RoomService', 'UpdateUserRoom')
  async updateUserRoom(dto: RoomUserDto): Promise<RoomUser> {
    return this.roomService.updateUserRoom(dto);
  }

  @GrpcMethod('RoomService', 'LeaveRoom')
  async leaveRoom(dto: UserIdDto): Promise<RoomUser> {
    return this.roomService.leaveRoom(dto);
  }
}
