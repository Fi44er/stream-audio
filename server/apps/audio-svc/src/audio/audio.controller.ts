import { Controller, Get, Res } from '@nestjs/common';
import { AudioService } from './audio.service';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller()
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Get('audio')
  getAudio(@Res() res) {
    // return new Observable((observer) => {
    //   const file$ = createReadStream(
    //     join(__dirname, '../tracks/pHonk_ONK_-_TikTok_Mega_Phonk_77458875.mp3'),
    //   );

    //   file$.on('data', (chunk) => observer.next(chunk));
    //   file$.on('end', () => observer.complete());
    //   file$.on('close', () => observer.complete());
    //   file$.on('error', (error) => observer.error(error));

    //   // there seems to be no way to actually close the stream
    // });

    const file = createReadStream(
      join(__dirname, '../tracks/pHonk_ONK_-_TikTok_Mega_Phonk_77458875.mp3'),
    );
    file.pipe(res);
  }
}
