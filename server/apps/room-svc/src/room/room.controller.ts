import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RoomService } from './room.service';
import { UserIdDto } from './dto/UserId.dto';
import { RoomUserDto } from './dto/RoomUser.dto';
import { RoomIdDto } from './dto/RoomId.dto';
import { CreateRoomDto } from './dto/CreateRoom.dto';
import {
  CreateRoomRes,
  DeleteLikeReq,
  Room,
  RoomUser,
  Rooms,
  SetLikeReq,
  Status,
} from 'apps/room-svc/proto/builds/room_svc';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @GrpcMethod('RoomService', 'GetAllRooms')
  async getAllRooms(): Promise<Rooms> {
    return this.roomService.getAllRooms();
  }

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

  @GrpcMethod('RoomService', 'SetLike')
  async setLike(dto: SetLikeReq): Promise<Status> {
    return this.roomService.setLike(dto);
  }

  @GrpcMethod('RoomService', 'DeleteLike')
  async deleteLike(dto: DeleteLikeReq): Promise<Status> {
    return this.roomService.deleteLike(dto);
  }
}
