// import { WebSocketGateway } from '@nestjs/websockets';
// import { SocketService } from './socket.service';

// @WebSocketGateway()
// export class SocketGateway {
//   constructor(private readonly socketService: SocketService) {}
// }

import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { RoomService } from './room.service';
import { UserService } from 'src/user/user.service';
import { Socket, Server } from 'socket.io';
import { AddMessageDto } from './dto/addMessage.dto';
import { FindOneWithRelationsDto } from './dto/findOneWithRelations.dto';
import { addAndEmitMessage, authenticateUser, joinRoom } from 'utils/room.util';

@WebSocketGateway({ cors: { origin: '*' } })
export class RoomGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  connectedUsers: Map<string, number> = new Map();

  constructor(
    private readonly roomService: RoomService,
    private readonly userService: UserService,
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

    const room = await this.roomService.getRoomUser(user.id);
    if (room) return this.onRoomJoin(client, { roomId: room.roomId });
  }

  // --- connecting a user to a room --- //
  @SubscribeMessage('join')
  async onRoomJoin(client: Socket, dto: FindOneWithRelationsDto) {
    const { roomId } = dto;
    const userId = this.connectedUsers.get(client.id);
    await joinRoom(client, roomId, userId, this.roomService);
  }

  // --- sending messages to a room --- //
  @SubscribeMessage('message')
  async onMessage(client: Socket, addMessageDto: AddMessageDto) {
    const userId = this.connectedUsers.get(client.id);
    await addAndEmitMessage(client, userId, addMessageDto, this.roomService);
  }

  // --- disconnecting the user from the room --- //
  @SubscribeMessage('leave')
  async onRoomLeave(client: Socket, roomId: string) {
    const userId = this.connectedUsers.get(client.id);
    await this.roomService.leaveRoom(userId);
    client.leave(roomId);
  }

  // --- disconnecting the user from the socket --- //
  async handleDisconnect(client: Socket) {
    this.connectedUsers.delete(client.id);
    console.log(`Client ID: ${client.id} disconection!`);
  }
}
