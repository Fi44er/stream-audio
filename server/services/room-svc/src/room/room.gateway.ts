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

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
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
    const token = client.handshake.query.token.toString();
    const payload = await this.userService.verifyAccessToken({ token });

    if (!payload) {
      client.disconnect(true);
      return;
    }

    const user = await this.userService.findOne({
      idOrEmail: String(payload.id),
    });

    if (!user) {
      client.disconnect(true);
      return;
    }

    this.connectedUsers.set(client.id, user.id);
    console.log(`Client ID: ${client.id} conection!`);

    const room = await this.roomService.getRoomUser(user.id);
    if (room) {
      return this.onRoomJoin(client, { roomId: room.roomId });
    }
  }

  // --- connecting a user to a room --- //
  @SubscribeMessage('join')
  async onRoomJoin(client: Socket, dto: FindOneWithRelationsDto) {
    const { roomId } = dto;
    const limit = 10;
    client.join('qwertyukm');
    // console.log(this.server.of('/').adapter.rooms);

    const room = await this.roomService.findOneWithRelations(dto);
    if (!room) return;

    const userId = this.connectedUsers.get(client.id);
    console.log('!!!!!!!!!!!!!!!!' + userId);
    console.log(this.connectedUsers);

    const messages = room.chat.slice(
      room.chat.length < limit ? 0 : -limit,
      room.chat.length,
    );

    await this.roomService.updateUserRoom(userId, room.id);

    client.join(roomId);

    client.emit('message', messages);
  }

  // --- sending messages to a room --- //
  @SubscribeMessage('message')
  async onMessage(client: Socket, addMessageDto: AddMessageDto) {
    const userId = this.connectedUsers.get(client.id);
    const room = await this.roomService.getRoomUser(userId);

    if (!room) {
      return;
    }

    addMessageDto.userId = userId;
    addMessageDto.roomId = room.roomId;

    await this.roomService.addMessage(addMessageDto);

    client.to(room.roomId).emit('message', addMessageDto.message);
    this.server.emit('message', addMessageDto.message);
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
