/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateRoomReq,
  CreateRoomRes,
  DeleteLikeReq,
  ROOM_SERVICE_NAME,
  RoomServiceClient,
  Rooms,
  SetLikeReq,
  Status,
} from 'apps/gateway/proto/builds/room_svc';
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

  @Get('get-all-rooms')
  async getAllRooms(): Promise<Observable<Rooms>> {
    return this.roomClient.getAllRooms({});
  }

  @Post('set-like')
  async setLike(@Body() dto: SetLikeReq): Promise<Observable<Status>> {
    return this.roomClient.setLike(dto);
  }

  @Delete('delete-like')
  async deleteLike(@Body() dto: DeleteLikeReq): Promise<Observable<Status>> {
    return this.roomClient.deleteLike(dto);
  }
}
