import { Controller, Get, Res } from '@nestjs/common';
import { AudioService } from './audio.service';

@Controller()
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Get('/stream')
  getStream(@Res() res) {
    const { id, client } = this.audioService.addClient();

    res
      .set({
        'Content-Type': 'audio/mp3',
        'Transfer-Encoding': 'chunked',
      })
      .status(200);

    client.pipe(res);

    res.on('close', () => {
      this.audioService.removeClient(id);
    });
  }
}
