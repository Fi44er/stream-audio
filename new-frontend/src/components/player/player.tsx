import { useState } from "react";

export default function Player() {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  return (
    <audio
      controls
      src="/QMIIR_-_plaki_plaki_77789170.mp3"
      autoPlay={true}
    ></audio>
  );
}
