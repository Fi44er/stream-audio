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

  private bufferHeader: Buffer = null;

  async afterInit() {
    console.log('Init');
    await this.audioServce.loadTracks('tracks');
    this.audioServce.play();
  }

  async handleConnection(client: Socket) {
    console.log('connect');

    if (this.bufferHeader) client.emit('bufferHeader', this.bufferHeader);
    client.on('bufferHeader', (data) => {
      this.bufferHeader = data;
      client.emit('bufferHeader', this.bufferHeader);
    });

    client.on('stream', (packet) => {
      // Only broadcast microphone if a header has been received
      if (!this.bufferHeader) return;

      // Audio stream from host microphone
      client.emit('stream', packet);
    });

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
