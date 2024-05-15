// import { v4 as uuid } from 'uuid';
// import { PassThrough } from 'stream';
// import { ffprobe } from '@dropb/ffprobe';
// import { readdir } from 'fs/promises';
// import { createReadStream } from 'fs';
// import { extname, join, resolve } from 'path';
// import { Injectable } from '@nestjs/common';
// import Throttle from 'throttle'; // Replaced Throttle with ThrottleDebounce

// @Injectable()
// export class AudioService {
//   private stream: any; // Define the type for 'stream' based on your requirements
//   private throttle: Throttle | undefined; // Changed the type of 'throttle' to ThrottleDebounce
//   private currentTrack: any; // Define the type for 'currentTrack' based on your requirements
//   private tracks: { filepath: string; bitrate: number }[] = [];
//   private index: number = 0;
//   private clients: Map<string, PassThrough> = new Map();
//   private bufferHeader: any;
//   private playing: boolean = false;

//   public current() {
//     return this.tracks[this.index];
//   }

//   public broadcast(chunk: any) {
//     this.clients.forEach((client) => {
//       client.write(chunk);
//     });
//   }

//   public addClient() {
//     const id = uuid();
//     const client = new PassThrough();

//     this.clients.set(id, client);
//     return { id, client };
//   }

//   public removeClient(id: string) {
//     this.clients.delete(id);
//   }

//   public async loadTracks(dir: string) {
//     const tracksDirectory = join(__dirname, './tracks');

//     let filenames = await readdir(tracksDirectory);

//     filenames = filenames.filter((filename) => extname(filename) === '.mp3');

//     const filepaths = filenames.map((filename) => join(dir, filename));

//     const promises = filepaths.map(async (filepath) => {
//       console.log('../' + filepath);

//       const bitrate = await this.getTrackBitrate('./' + filepath);

//       return { filepath, bitrate };
//     });

//     this.tracks = await Promise.all(promises);
//     console.log(`Loaded ${this.tracks.length} tracks`);
//   }

//   private async getTrackBitrate(filepath: string) {
//     const fullFilePath = resolve(__dirname, filepath);
//     const data = await ffprobe(fullFilePath);
//     const bitrate = data?.format?.bit_rate;

//     return bitrate ? parseInt(bitrate) : 128000;
//   }

//   public getNextTrack() {
//     if (this.index >= this.tracks.length - 1) {
//       this.index = 0;
//     }

//     const track = this.tracks[this.index++];
//     this.currentTrack = track;

//     return track;
//   }

//   public pause() {
//     if (!this.started() || !this.playing) return;
//     this.playing = false;
//     console.log('Paused');
//     this.throttle.removeAllListeners('end');
//     this.throttle.end();
//   }

//   public resume() {
//     if (!this.started() || this.playing) return;
//     console.log('Resumed');
//     this.start();
//   }

//   private started() {
//     return this.stream && this.throttle && this.currentTrack;
//   }

//   public play(useNewTrack: boolean = false) {
//     if (useNewTrack || !this.currentTrack) {
//       console.log('Playing new track');
//       this.getNextTrack();
//       this.loadTrackStream();
//       this.start();
//     } else {
//       this.resume();
//     }
//   }

//   private loadTrackStream() {
//     const track = this.currentTrack;
//     if (!track) return;

//     const filePath = join(__dirname, track.filepath);

//     console.log('Starting audio stream');
//     this.stream = createReadStream(filePath);
//   }

//   public async start() {
//     const track = this.currentTrack;
//     if (!track) return;

//     this.playing = true;
//     this.throttle = new Throttle(track.bitrate / 8);
//     this.stream
//       .pipe(this.throttle)
//       .on('data', (chunk) => this.broadcast(chunk))
//       .on('end', () => this.play(true))
//       .on('error', () => this.play(true));
//   }
// }

import { v4 as uuid } from 'uuid';
import { PassThrough } from 'stream';
import { ffprobe } from '@dropb/ffprobe';
import { readdir } from 'fs/promises';
import { ReadStream, createReadStream } from 'fs';
import { extname, join, resolve } from 'path';
import { Injectable } from '@nestjs/common';
import Throttle from 'throttle'; // Replaced Throttle with ThrottleDebounce

interface Track {
  filepath: string;
  bitrate: number;
}

@Injectable()
export class AudioService {
  private tracks: Track[] = [];
  private currentTrack: Track | null = null;
  private clients: Map<string, PassThrough> = new Map();
  private playing: boolean = false;
  private throttle: Throttle | null = null;
  private stream: ReadStream | null = null;

  public async loadTracks(dir: string) {
    const tracksDirectory = join(__dirname, './tracks');
    const filenames = await readdir(tracksDirectory);
    const mp3Files = filenames.filter(
      (filename) => extname(filename) === '.mp3',
    );
    const filepaths = mp3Files.map((filename) => join(dir, filename));
    const tracks = await Promise.all(filepaths.map(this.getTrackBitrate));
    this.tracks = tracks;
    console.log(`Loaded ${tracks.length} tracks`);
  }

  private async getTrackBitrate(filepath: string) {
    const fullFilePath = resolve(__dirname, filepath);
    const data = await ffprobe(fullFilePath);
    const bitrate = data?.format?.bit_rate;
    return { filepath, bitrate: bitrate ? parseInt(bitrate) : 128000 };
  }

  public play() {
    if (!this.currentTrack) {
      this.currentTrack = this.tracks[0];
      this.loadTrackStream();
      this.start();
    } else {
      this.resume();
    }
  }

  private loadTrackStream() {
    const track = this.currentTrack;
    if (!track) return;
    const filePath = join(__dirname, track.filepath);
    console.log('Starting audio stream');
    this.stream = createReadStream(filePath);
  }

  public async start() {
    const track = this.currentTrack;
    if (!track) return;
    this.playing = true;
    this.throttle = new Throttle(track.bitrate / 8);
    this.stream
      .pipe(this.throttle)
      .on('data', (chunk) => this.broadcast(chunk))
      .on('end', () => this.play())
      .on('error', () => this.play());
  }

  public pause() {
    if (!this.playing) return;
    this.playing = false;
    console.log('Paused');
    this.throttle.removeAllListeners('end');
    this.throttle.end();
  }

  public resume() {
    if (this.playing) return;
    console.log('Resumed');
    this.start();
  }

  public broadcast(chunk: Buffer) {
    for (const client of this.clients.values()) {
      client.write(chunk);
    }
  }

  public addClient() {
    const id = uuid();
    const client = new PassThrough();
    this.clients.set(id, client);
    return { id, client };
  }

  public removeClient(id: string) {
    this.clients.delete(id);
  }
}
