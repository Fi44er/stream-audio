import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { RoomService } from './room.service';
import { UserService } from 'src/user/user.service';
import { Observable } from 'rxjs';
import { JwtPayload } from 'proto/user_svc';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoomGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  connectedUsers: Map<string, string> = new Map();

  constructor(
    private readonly roomService: RoomService,
    private readonly userService: UserService,
  ) {}

  afterInit() {
    console.log('Init');
  }

  handleConnection(client: Socket) {
    const token = client.handshake.query.token.toString();
    const payload = this.userService.verifyAccessToken({ token });

    payload.then((res: Observable<JwtPayload>) => {
      res.subscribe((jwtPayload: JwtPayload) => {
        const id = jwtPayload.id;
        const user =
          payload && this.userService.findOne({ idOrEmail: String(id) });
        if (!user) {
          client.disconnect(true);
          return;
        }
      });
    });

    console.log(`Client ID: ${client.id} conection!`);
    this.connectedUsers.set(client.id, client.id);
  }

  handleDisconnect(client: any) {
    console.log(`Client ID: ${client.id} disconection!`);
  }
}
