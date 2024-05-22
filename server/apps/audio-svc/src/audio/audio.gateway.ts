import { Server, Socket } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AudioService } from './audio.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AudioGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly audioServce: AudioService) {}
  @WebSocketServer() server: Server;

  async afterInit() {
    console.log('Init');
    await this.audioServce.loadTracks('tracks');
    this.audioServce.play();
  }

  async handleConnection(client: Socket) {
    console.log('connect');

    client.on('control', (command) => {
      switch (command) {
        case 'pause':
          this.audioServce.pause();
          break;
        case 'resume':
          this.audioServce.resume();
          break;
      }
    });
  }

  handleDisconnect() {
    console.log('Disconnected');
  }
}
