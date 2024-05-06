/* eslint-disable prettier/prettier */
import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateRoomReq,
  CreateRoomRes,
  ROOM_SERVICE_NAME,
  RoomServiceClient,
} from 'proto/builds/room_svc';
import { Observable } from 'rxjs';

@Controller('room-svc')
export class RoomSvcController implements OnModuleInit {
  private roomClient: RoomServiceClient;
  constructor(@Inject(ROOM_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.roomClient =
      this.client.getService<RoomServiceClient>(ROOM_SERVICE_NAME);
  }

  @Post('create-room')
  async createRoom(
    @Body() dto: CreateRoomReq,
  ): Promise<Observable<CreateRoomRes>> {
    return this.roomClient.createRoom(dto);
  }
}
