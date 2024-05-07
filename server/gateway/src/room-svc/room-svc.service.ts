import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  Chat,
  Message,
  Room,
  ROOM_SERVICE_NAME,
  RoomId,
  RoomServiceClient,
  RoomUser,
  UserId,
} from 'proto/builds/room_svc';
import { firstValueFrom } from 'rxjs';
import { rpcErrorHandling$ } from './functions/rpcErrorHandling';

@Injectable()
export class RoomSvcService implements OnModuleInit {
  private roomClient: RoomServiceClient;
  constructor(@Inject(ROOM_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.roomClient =
      this.client.getService<RoomServiceClient>(ROOM_SERVICE_NAME);
  }

  async getRoomUser(dto: UserId): Promise<RoomUser> {
    const observableRoomUser$ = this.roomClient.getRoomUser(dto);
    const roomUser = firstValueFrom(observableRoomUser$);
    return roomUser;
  }

  async findOneWithRelations(dto: RoomId): Promise<Room> {
    const observableRoom = this.roomClient.findOneWithRelations(dto);
    const room = firstValueFrom(observableRoom);
    return room;
  }

  async updateUserRoom(dto: RoomUser): Promise<RoomUser> {
    const observableRoomUser = this.roomClient.updateUserRoom(dto);
    const roomUser = firstValueFrom(observableRoomUser);
    return roomUser;
  }

  async leaveRoom(dto: UserId): Promise<RoomUser> {
    const observableRoomUser = this.roomClient.leaveRoom(dto);
    const roomUser = rpcErrorHandling$(observableRoomUser);
    return roomUser;
  }

  async addMessage(dto: Message): Promise<Chat> {
    const observableChat$ = this.roomClient.addMessage(dto);
    const chat = rpcErrorHandling$(observableChat$);

    return chat;
  }
}
