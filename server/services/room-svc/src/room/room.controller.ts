import { Controller } from '@nestjs/common';
import { RoomService } from './room.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  Chat,
  CreateRoomReq,
  CreateRoomRes,
  Message,
  Room,
  RoomId,
  RoomUser,
  UserId,
} from 'proto/builds/room_svc';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @GrpcMethod('RoomService', 'CreateRoom')
  async createRoom(dto: CreateRoomReq): Promise<CreateRoomRes> {
    return this.roomService.createRoom(dto);
  }

  @GrpcMethod('RoomService', 'GetRoomUser')
  async getRoomUser(dto: UserId): Promise<RoomUser> {
    return this.roomService.getRoomUser(dto);
  }

  @GrpcMethod('RoomService', 'FindOneWithRelations')
  async findOneWithRelations(dto: RoomId): Promise<Room> {
    return this.roomService.findOneWithRelations(dto);
  }

  @GrpcMethod('RoomService', 'UpdateUserRoom')
  async updateUserRoom(dto: RoomUser): Promise<RoomUser> {
    return this.roomService.updateUserRoom(dto);
  }

  @GrpcMethod('RoomService', 'LeaveRoom')
  async leaveRoom(dto: UserId): Promise<RoomUser> {
    return this.roomService.leaveRoom(dto);
  }

  @GrpcMethod('RoomService', 'AddMessage')
  async addMessage(dto: Message): Promise<Chat> {
    console.log(dto);

    return this.roomService.addMessage(dto);
  }
}
