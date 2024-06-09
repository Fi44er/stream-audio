import styles from "./audioControls.module.scss";

interface AudioControlsProps {
  isPlaying: boolean;
  onPlayPauseClick: (playing: boolean) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
}

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}: AudioControlsProps) => (
  <div className={styles.audioControls}>
    <button
      type="button"
      className={styles.prev}
      aria-label="Previous"
      onClick={onPrevClick}
    >
      <img src="/icons/prev.svg" />
    </button>
    {isPlaying ? (
      <button
        type="button"
        className={styles.pause}
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
      >
        <img src="/icons/pause.svg" />
      </button>
    ) : (
      <button
        type="button"
        className={styles.play}
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
      >
        <img src="/icons/play.svg" />
      </button>
    )}
    <button
      type="button"
      className={styles.next}
      aria-label="Next"
      onClick={onNextClick}
    >
      <img src="/icons/next.svg" />
    </button>
  </div>
);

export default AudioControls;
