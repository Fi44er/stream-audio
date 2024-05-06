import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
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
import { RoomService } from './room.service';

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
    if (dto.message === '' || dto.message === null) {
      const error = new RpcException({
        message: 'Message is required',
        code: 3,
      });
      throw error;
    }
    return this.roomService.addMessage(dto);
  }
}
