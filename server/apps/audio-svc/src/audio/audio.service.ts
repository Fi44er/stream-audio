import { PassThrough } from 'stream';
import { ffprobe } from '@dropb/ffprobe';
import { readdir } from 'fs/promises';
import { ReadStream, createReadStream } from 'fs';
import { extname, join, resolve } from 'path';
import { Injectable } from '@nestjs/common';
import Throttle from 'throttle';

interface Track {
  filepath: string;
  bitrate: number;
}

interface Room {
  tracks: Track[];
  currentTrack: Track | null;
  stream: ReadStream | null;
  throttle: Throttle | null;
  clients: Map<string, PassThrough>;
  playing: boolean;
}

@Injectable()
export class AudioService {
  private rooms: Map<string, Room> = new Map();

  public createRoom(id: string) {
    const room: Room = {
      tracks: [],
      currentTrack: null,
      stream: null,
      throttle: null,
      clients: new Map(),
      playing: false,
    };
    this.rooms.set(id, room);
    return room;
  }

  public addClient(roomId: string, clientId: string) {
    const room = this.rooms.get(roomId);
    if (!room) throw new Error(`Room not found: ${roomId}`);
    const client = new PassThrough();
    room.clients.set(clientId, client);
    return { clientId, client, roomId };
  }

  public removeClient(roomId: string, clientId: string) {
    const room = this.rooms.get(roomId);
    if (!room) throw new Error(`Room not found: ${roomId}`);
    room.clients.delete(clientId);
  }

  public async loadTracks(roomId: string, dir: string) {
    const room = this.rooms.get(roomId);
    if (!room) throw new Error(`Room not found: ${roomId}`);
    const tracksDirectory = join(__dirname, './tracks');
    const filenames = await readdir(tracksDirectory);
    const mp3Files = filenames.filter(
      (filename) => extname(filename) === '.mp3',
    );
    const filepaths = mp3Files.map((filename) => join(dir, filename));
    const tracks = await Promise.all(filepaths.map(this.getTrackBitrate));
    room.tracks = tracks;
    console.log(`Loaded ${tracks.length} tracks in room ${roomId}`);
  }

  private async getTrackBitrate(filepath: string) {
    const fullFilePath = resolve(__dirname, filepath);
    const data = await ffprobe(fullFilePath);
    const bitrate = data?.format?.bit_rate;
    return { filepath, bitrate: bitrate ? parseInt(bitrate) : 128000 };
  }

  public play(roomId: string) {
    const room = this.rooms.get(roomId);
    if (!room) throw new Error(`Room not found: ${roomId}`);
    if (!room.currentTrack) {
      room.currentTrack = room.tracks[0];
      this.loadTrackStream(room);
      this.start(room);
    } else {
      this.resume(room);
    }
  }

  private loadTrackStream(room: Room) {
    const track = room.currentTrack;
    if (!track) return;
    const filePath = join(__dirname, track.filepath);
    console.log('Starting audio stream in room');
    room.stream = createReadStream(filePath);
  }

  public start(room: Room) {
    const track = room.currentTrack;
    if (!track) return;
    room.playing = true;
    room.throttle = new Throttle(track.bitrate / 8);
    room.stream
      .pipe(room.throttle)
      .on('data', (chunk) => this.broadcast(room, chunk))
      .on('end', () => this.playNextTrack(room))
      .on('error', () => this.playNextTrack(room));
  }

  public pause(roomId: string) {
    const room = this.rooms.get(roomId);
    if (!room) throw new Error(`Room not found: ${roomId}`);
    this.stop(room);
  }

  public resume(roomId: string) {
    const room = this.rooms.get(roomId);
    if (!room.playing) {
      this.start(room);
    }
  }

  public stop(room: Room) {
    if (room.playing) {
      this.stopThrottle(room);
      room.stream?.unpipe();
      room.stream = null;
      room.playing = false;
    }
  }

  private stopThrottle(room: Room) {
    room.throttle?.destroy();
    room.throttle = null;
  }

  public playNextTrack(room: Room) {
    this.stop(room);
    const nextTrackIndex = room.tracks.indexOf(room.currentTrack!) + 1;
    if (nextTrackIndex >= room.tracks.length) {
      room.currentTrack = null;
    } else {
      room.currentTrack = room.tracks[nextTrackIndex];
      this.loadTrackStream(room);
      this.start(room);
    }
  }

  private broadcast(room: Room, chunk: Buffer) {
    for (const client of room.clients.values()) {
      client.write(chunk);
    }
  }
}

// import { v4 as uuid } from 'uuid';
// import { PassThrough } from 'stream';
// import { ffprobe } from '@dropb/ffprobe';
// import { readdir } from 'fs/promises';
// import { ReadStream, createReadStream } from 'fs';
// import { extname, join, resolve } from 'path';
// import { Injectable } from '@nestjs/common';
// import Throttle from 'throttle'; // Replaced Throttle with ThrottleDebounce

// interface Track {
//   filepath: string;
//   bitrate: number;
// }

// @Injectable()
// export class AudioService {
//   private tracks: Track[] = [];
//   private currentTrack: Track | null = null;
//   private clients: Map<string, PassThrough> = new Map();
//   private playing: boolean = false;
//   private throttle: Throttle | null = null;
//   private stream: ReadStream | null = null;

//   public async loadTracks(dir: string) {
//     const tracksDirectory = join(__dirname, './tracks');
//     const filenames = await readdir(tracksDirectory);
//     const mp3Files = filenames.filter(
//       (filename) => extname(filename) === '.mp3',
//     );
//     const filepaths = mp3Files.map((filename) => join(dir, filename));
//     const tracks = await Promise.all(filepaths.map(this.getTrackBitrate));
//     this.tracks = tracks;
//     console.log(`Loaded ${tracks.length} tracks`);
//   }

//   private async getTrackBitrate(filepath: string) {
//     const fullFilePath = resolve(__dirname, filepath);
//     const data = await ffprobe(fullFilePath);
//     const bitrate = data?.format?.bit_rate;
//     return { filepath, bitrate: bitrate ? parseInt(bitrate) : 128000 };
//   }

//   public play() {
//     if (!this.currentTrack) {
//       this.currentTrack = this.tracks[0];
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
//       .on('end', () => this.play())
//       .on('error', () => this.play());
//   }

//   public pause() {
//     if (!this.playing) return;
//     this.playing = false;
//     console.log('Paused');
//     this.throttle.removeAllListeners('end');
//     this.throttle.end();
//   }

//   public resume() {
//     if (this.playing) return;
//     console.log('Resumed');
//     this.start();
//   }

//   public broadcast(chunk: Buffer) {
//     for (const client of this.clients.values()) {
//       client.write(chunk);
//     }
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
// }
