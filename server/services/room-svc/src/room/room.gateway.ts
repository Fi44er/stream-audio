import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { RoomService } from './room.service';
import { UserService } from 'src/user/user.service';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoomGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  connectedUsers: Map<string, number> = new Map();

  constructor(
    private readonly roomService: RoomService,
    private readonly userService: UserService,
  ) {}

  afterInit() {
    console.log('Init');
  }

  async handleConnection(client: Socket) {
    const token = client.handshake.query.token.toString();
    const payload = await this.userService.verifyAccessToken({ token });
    const user = await this.userService.findOne({
      idOrEmail: String(payload.id),
    });

    if (!user) {
      client.disconnect(true);
      return;
    }

    const room = await this.roomService.getRoomUser(user.id);
    if (room) {
      return this.onRoomJoin(client, room.roomId);
    }

    this.connectedUsers.set(client.id, user.id);
    console.log(`Client ID: ${client.id} conection!`);
  }

  @SubscribeMessage('join')
  async onRoomJoin(client: Socket, roomId: string) {
    const limit = 10;

    const room = await this.roomService.findOneWithRelations(roomId);
    if (!room) return;

    const userId = this.connectedUsers.get(client.id);

    const messages = room.chat.slice(
      room.chat.length < limit ? 0 : -limit,
      room.chat.length,
    );

    await this.roomService.updateUserRoom(userId, room.id);

    client.join(roomId);

    client.emit('message', messages);
  }

  handleDisconnect(client: Socket) {
    this.connectedUsers.delete(client.id);
    console.log(`Client ID: ${client.id} disconection!`);
  }
}
