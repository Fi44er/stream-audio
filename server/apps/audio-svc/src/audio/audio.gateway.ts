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
    await this.audioServce.loadTracks('tracks', '1');
    this.audioServce.play('1');
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
          this.audioServce.pause('1');
          break;
        case 'resume':
          this.audioServce.resume('1');
          break;
      }
    });
  }

  handleDisconnect() {
    console.log('Disconnected');
  }
}
