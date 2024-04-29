import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { RoomService } from './room.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoomGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  connectedUsers: Map<string, string> = new Map();

  constructor(private readonly roomService: RoomService) {}

  afterInit() {
    console.log('Init');
  }

  handleConnection(client: any) {
    console.log(`Client ID: ${client.id} conection!`);
    this.connectedUsers.set(client.id, client.id);
  }

  handleDisconnect(client: any) {
    console.log(`Client ID: ${client.id} disconection!`);
  }
}
