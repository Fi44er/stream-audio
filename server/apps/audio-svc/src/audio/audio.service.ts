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

  async loadTracks(dir: string) {
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

  play() {
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

  start() {
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

  pause() {
    if (!this.playing) return;
    this.playing = false;
    console.log('Paused');
    this.throttle.removeAllListeners('end');
    this.throttle.end();
  }

  resume() {
    if (this.playing) return;
    console.log('Resumed');
    this.start();
  }

  broadcast(chunk: Buffer) {
    for (const client of this.clients.values()) {
      client.write(chunk);
    }
  }

  addClient() {
    const id = uuid();
    const client = new PassThrough();
    this.clients.set(id, client);
    return { id, client };
  }

  removeClient(id: string) {
    this.clients.delete(id);
  }
}
