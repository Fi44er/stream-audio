import { useState, useEffect, useRef } from "react";
import styles from "./player.module.scss";
import AudioControls from "../audioControls/audioControls";

interface Track {
  title: string;
  artist: string;
  image: string;
  audioSrc: string;
}

interface AudioPlayerProps {
  tracks: Track[];
}

const AudioPlayer = ({ tracks }: AudioPlayerProps) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [maxDuration, setMaxDuration] = useState(0);

  const currentTrack = tracks[trackIndex];
  const { title, artist, image, audioSrc } = currentTrack;

  const audioRef = useRef<HTMLAudioElement>(new Audio(audioSrc));
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    audioRef.current.src = audioSrc;
    audioRef.current.load();
  }, [trackIndex]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    audioRef.current.addEventListener("loadedmetadata", () => {
      setMaxDuration(audioRef.current.duration);
    });
  }, [audioRef]);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  const handleScrub = (value: number) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const handleScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    setTrackIndex(
      (prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length
    );
  };

  const toNextTrack = () => {
    setTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  return (
    <div className={styles.audioPlayer}>
      <div className={styles.trackInfo}>
        <img
          className={styles.artwork}
          src={image}
          alt={`track artwork for ${title} by ${artist}`}
        />
        <h2 className={styles.title}>{title}</h2>
        <h3 className={styles.artist}>{artist}</h3>
        <AudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        />
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={maxDuration}
          className={styles.progress}
          onChange={(e) => handleScrub(e.target.valueAsNumber)}
          onMouseUp={handleScrubEnd}
          onKeyUp={handleScrubEnd}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
