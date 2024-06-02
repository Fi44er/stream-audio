/* eslint-disable prettier/prettier */
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import { addAndEmitMessage } from './functions/chat';
import { RoomSvcService } from '../room-svc/room-svc.service';
import { UserSvcService } from '../user-svc/user-svc.service';
import { ChatSvcService } from '../chat-svc/chat-svc.service';
import { authenticateUser, joinRoom } from './functions/room';
import { RoomId } from 'apps/gateway/proto/builds/room_svc';
import { Message } from 'apps/gateway/proto/builds/chat_svc';

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  connectedUsers: Map<string, number> = new Map();

  constructor(
    private readonly roomService: RoomSvcService,
    private readonly userService: UserSvcService,
    private readonly chatSvcService: ChatSvcService,
  ) {}

  afterInit() {
    console.log('Init');
  }

  // --- connecting a user to a socket --- //
  async handleConnection(client: Socket) {
    const user = await authenticateUser(client, this.userService);
    if (!user) return;
    this.connectedUsers.set(client.id, user.id);
    console.log(`Client ID: ${client.id} conection!`);

    const room = await this.roomService.getRoomUser({ userId: user.id });
    if (room) return this.onRoomJoin(client, { roomId: room.roomId });
  }

  // --- connecting a user to a room --- //
  @SubscribeMessage('join')
  async onRoomJoin(client: Socket, dto: RoomId) {
    const { roomId } = dto;
    const userId = this.connectedUsers.get(client.id);
    await joinRoom(client, roomId, userId, this.roomService);
  }

  // --- sending messages to a room --- //
  @SubscribeMessage('message')
  async onMessage(client: Socket, dto: Message) {
    const userId = this.connectedUsers.get(client.id);
    dto.userId = userId;
    await addAndEmitMessage(
      this.server,
      userId,
      dto,
      this.roomService,
      this.chatSvcService,
    );
  }

  // --- disconnecting the user from the room --- //
  @SubscribeMessage('leave')
  async onRoomLeave(client: Socket, dto: RoomId) {
    console.log('leave');

    const { roomId } = dto;
    const idUser = this.connectedUsers.get(client.id);
    await this.roomService.leaveRoom({ userId: idUser });
    client.leave(roomId);
  }

  // --- disconnecting the user from the socket --- //
  async handleDisconnect(client: Socket) {
    this.connectedUsers.delete(client.id);
    console.log(`Client ID: ${client.id} disconection!`);
  }
}
