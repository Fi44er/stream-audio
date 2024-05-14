// import { v4 as uuid } from 'uuid';
// import { PassThrough } from 'stream';
// import { ffprobe } from '@dropb/ffprobe';
// import { readdir } from 'fs/promises';
// import { createReadStream } from 'fs';
// import { extname, join, resolve } from 'path';
// import { Injectable } from '@nestjs/common';
// import Throttle from 'throttle';

// type Track = {
//   filepath: string;
//   bitrate: number;
// };

// @Injectable()
// export class AudioService {
//   private tracks: Map<string, Track[]> = new Map();
//   private index: Map<string, number> = new Map();
//   private clients: Map<string, Map<string, PassThrough>> = new Map();
//   private stream: Map<string, NodeJS.ReadableStream | null> = new Map();
//   private throttle: Map<string, Throttle | null> = new Map();
//   private playing: Map<string, boolean> = new Map();
//   private currentTrack: Map<string, Track | null> = new Map();

//   // Load tracks from a directory and calculate their bitrates
//   async loadTracks(dir: string, roomId: string) {
//     const tracksDirectory = join(__dirname, './tracks');
//     const filenames = await readdir(tracksDirectory);
//     const filepaths = filenames
//       .filter((filename) => extname(filename) === '.mp3')
//       .map((filename) => join(dir, filename));

//     const promises = filepaths.map(async (filepath) => {
//       const bitrate = await this.getTrackBitrate('./' + filepath);
//       return { filepath, bitrate };
//     });

//     const quantityTracks = this.tracks.get(roomId)?.length;
//     this.tracks.set(roomId, await Promise.all(promises));
//     console.log(`Loaded ${quantityTracks} tracks in room: ${roomId}`);
//   }

//   // Retrieve the bitrate of a track using ffprobe
//   async getTrackBitrate(filepath: string) {
//     const fullFilePath = resolve(__dirname, filepath);
//     const data = await ffprobe(fullFilePath);
//     const bitrate = data?.format?.bit_rate;

//     return bitrate ? parseInt(bitrate) : 128000;
//   }

//   // Get the next track to play in a room
//   getNextTrack(roomId: string) {
//     const index = this.index.get(roomId);
//     const tracks = this.tracks.get(roomId);
//     if (index >= tracks.length - 1) {
//       this.index.set(roomId, 0);
//     }

//     const track = tracks[index + 1];
//     this.currentTrack.set(roomId, track);

//     return track;
//   }

//   // Pause playback in a room
//   pause(roomId: string) {
//     console.log(`Paused in room: ${roomId}`);
//     if (!this.started(roomId) || !this.playing.get(roomId)) return;
//     this.playing.set(roomId, false);
//     this.throttle.get(roomId)?.removeAllListeners('end');
//     this.throttle.get(roomId)?.end();
//   }

//   // Resume playback in a room
//   resume(roomId: string) {
//     console.log(this.started(roomId));

//     if (this.started(roomId) || this.playing.get(roomId)) return;
//     console.log(`Resumed in room: ${roomId}`);
//     this.start(roomId);
//   }

//   // Check if playback has started in a room
//   started(roomId: string) {
//     return (
//       this.stream.get(roomId) &&
//       this.throttle.get(roomId) &&
//       this.currentTrack.get(roomId)
//     );
//   }

//   // Play a track in a room, optionally starting a new track
//   play(roomId: string, useNewTrack: boolean = false) {
//     if (useNewTrack || !this.currentTrack.get(roomId)) {
//       console.log('Playing new track');
//       this.getNextTrack(roomId);
//       this.loadTrackStream(roomId);
//       this.start(roomId);
//     } else {
//       this.resume(roomId);
//     }
//   }

//   // Load and start streaming a track in a room
//   loadTrackStream(roomId: string) {
//     const track = this.currentTrack.get(roomId);
//     if (!track) return;

//     const filePath = join(__dirname, track.filepath);
//     console.log('Starting audio stream');
//     const newStream = createReadStream(filePath);
//     this.stream.set(roomId, newStream);
//   }

//   // Start playback of a track in a room
//   start(roomId: string) {
//     const track = this.currentTrack.get(roomId);
//     if (!track) return;

//     this.playing.set(roomId, true);
//     const newThrottle = new Throttle(track.bitrate / 8);
//     this.throttle.set(roomId, newThrottle);
//     this.stream
//       .get(roomId)
//       .pipe(this.throttle.get(roomId))
//       .on('data', (chunk: Buffer) => this.broadcast(chunk, roomId))
//       .on('end', () => this.play(roomId, true))
//       .on('error', () => this.play(roomId, true));
//   }

//   // Broadcast audio chunk to all clients in a room
//   broadcast(chunk: Buffer, roomId: string) {
//     this.clients.get(roomId).forEach((client) => {
//       client.write(chunk);
//     });
//   }

//   // Add a new client to a room
//   addClient(roomId: string) {
//     const id = uuid();
//     const client = new PassThrough();
//     const clientsInRoom =
//       this.clients.get(roomId) || new Map<string, PassThrough>();
//     clientsInRoom.set(id, client);
//     this.clients.set(roomId, clientsInRoom);
//     return { id, client };
//   }

//   // Remove a client from a room
//   removeClient(id: string, roomId: string) {
//     const clientsInRoom = this.clients.get(roomId);
//     if (clientsInRoom) {
//       clientsInRoom.delete(id);
//     }
//   }
// }
// // queue.service.ts;
// import { v4 as uuid } from 'uuid';
// import { PassThrough } from 'stream';
// import { ffprobe } from '@dropb/ffprobe';
// import { readdir } from 'fs/promises';
// import { createReadStream } from 'fs';
// import { extname, join, resolve } from 'path';
// import { Injectable } from '@nestjs/common';
// import Throttle from 'throttle';

// @Injectable()
// export class AudioService {
//   private stream: any; // Define the type for 'stream' based on your requirements
//   private throttle: Throttle | undefined; // Define the type for 'throttle' based on your requirements
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
import { createReadStream } from 'fs';
import { extname, join, resolve } from 'path';
import { Injectable } from '@nestjs/common';
import { ThrottleDebounce } from 'throttle-debounce'; // Replaced Throttle with ThrottleDebounce

@Injectable()
export class AudioService {
  private stream: any; // Define the type for 'stream' based on your requirements
  private throttle: ThrottleDebounce | undefined; // Changed the type of 'throttle' to ThrottleDebounce
  private currentTrack: any; // Define the type for 'currentTrack' based on your requirements
  private tracks: { filepath: string; bitrate: number }[] = [];
  private index: number = 0;
  private clients: Map<string, PassThrough> = new Map();
  private bufferHeader: any;
  private playing: boolean = false;

  public current() {
    return this.tracks[this.index];
  }

  public broadcast(chunk: any) {
    this.clients.forEach((client) => {
      client.write(chunk);
    });
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

  public async loadTracks(dir: string) {
    const tracksDirectory = join(__dirname, './tracks');

    let filenames = await readdir(tracksDirectory);

    filenames = filenames.filter((filename) => extname(filename) === '.mp3');

    const filepaths = filenames.map((filename) => join(dir, filename));

    const promises = filepaths.map(async (filepath) => {
      console.log('../' + filepath);

      const bitrate = await this.getTrackBitrate('./' + filepath);

      return { filepath, bitrate };
    });

    this.tracks = await Promise.all(promises);
    console.log(`Loaded ${this.tracks.length} tracks`);
  }

  private async getTrackBitrate(filepath: string) {
    const fullFilePath = resolve(__dirname, filepath);
    const data = await ffprobe(fullFilePath);
    const bitrate = data?.format?.bit_rate;

    return bitrate ? parseInt(bitrate) : 128000;
  }

  public getNextTrack() {
    if (this.index >= this.tracks.length - 1) {
      this.index = 0;
    }

    const track = this.tracks[this.index++];
    this.currentTrack = track;

    return track;
  }

  public pause() {
    if (!this.started() || !this.playing) return;
    this.playing = false;
    console.log('Paused');
    this.throttle.removeAllListeners('end');
    this.throttle.end();
  }

  public resume() {
    if (!this.started() || this.playing) return;
    console.log('Resumed');
    this.start();
  }

  private started() {
    return this.stream && this.throttle && this.currentTrack;
  }

  public play(useNewTrack: boolean = false) {
    if (useNewTrack || !this.currentTrack) {
      console.log('Playing new track');
      this.getNextTrack();
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
    this.throttle = new ThrottleDebounce(track.bitrate / 8); // Changed Throttle to ThrottleDebounce
    this.stream
      .pipe(this.throttle)
      .on('data', (chunk) => this.broadcast(chunk))
      .on('end', () => this.play(true))
      .on('error', () => this.play(true));
  }
}
