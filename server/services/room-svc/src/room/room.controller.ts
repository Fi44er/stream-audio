import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Chat, CreateRoomRes, Room, RoomUser } from 'proto/builds/room_svc';
import { RoomService } from './room.service';
import { MessageDto } from './dto/Message.dto';
import { ValidationPipeWithRpcException } from 'lib/pipe/validationPipeWithRpcException';
import { UserIdDto } from './dto/UserId.dto';
import { RoomUserDto } from './dto/RoomUser.dto';
import { RoomIdDto } from './dto/RoomId.dto';
import { CreateRoomDto } from './dto/CreateRoom.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @GrpcMethod('RoomService', 'CreateRoom')
  @ValidationPipeWithRpcException()
  async createRoom(dto: CreateRoomDto): Promise<CreateRoomRes> {
    return this.roomService.createRoom(dto);
  }

  @GrpcMethod('RoomService', 'GetRoomUser')
  @ValidationPipeWithRpcException()
  async getRoomUser(dto: UserIdDto): Promise<RoomUser> {
    return this.roomService.getRoomUser(dto);
  }

  @GrpcMethod('RoomService', 'FindOneWithRelations')
  @ValidationPipeWithRpcException()
  async findOneWithRelations(dto: RoomIdDto): Promise<Room> {
    return this.roomService.findOneWithRelations(dto);
  }

  @GrpcMethod('RoomService', 'UpdateUserRoom')
  @ValidationPipeWithRpcException()
  async updateUserRoom(dto: RoomUserDto): Promise<RoomUser> {
    return this.roomService.updateUserRoom(dto);
  }

  @GrpcMethod('RoomService', 'LeaveRoom')
  @ValidationPipeWithRpcException()
  async leaveRoom(dto: UserIdDto): Promise<RoomUser> {
    return this.roomService.leaveRoom(dto);
  }

  @GrpcMethod('RoomService', 'AddMessage')
  @ValidationPipeWithRpcException()
  async addMessage(dto: MessageDto): Promise<Chat> {
    return this.roomService.addMessage(dto);
  }
}
