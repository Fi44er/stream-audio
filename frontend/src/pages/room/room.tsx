import styles from "./room.module.scss";
import Cookies from "js-cookie";
import { Chat } from "../../components/chat/chat";
import { Socket, io } from "socket.io-client";
import { useEffect, useState } from "react";

export const Room = ({ roomid }: { roomid: string }) => {
  const token = Cookies.get("accesstoken")?.split(" ")[1];

  const [socket, setSocket] = useState<Socket | null>(null);

  const [playing, setPlaying] = useState(false);

  const audio = new Audio();

  useEffect(() => {
    const socketInstance = io(`http://localhost:6069?token=${token}`);
    setSocket(socketInstance);
    socketInstance.emit("joinRoom", { roomid });

    return () => {
      // отключение от сокета при выходе со страницы
      socketInstance.disconnect();
    };
  }, [token, roomid]);

  useEffect(() => {
    socket?.emit("stream", roomid);

    socket?.on("stream", (audioStream) => {
      console.log(audioStream);

      audio.srcObject = audioStream;
      // audio.play();
    });
  });

  const handlePlay = () => {
    console.log(2);
    if (audio) {
      audio.play();
      setPlaying(true);
    }
  };

  const handlePause = () => {
    if (audio) {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <div className={styles.room}>
      <div className={styles.player}>
        <div>
          <button onClick={handlePlay}>Play</button>
          <button onClick={handlePause}>Pause</button>
          {playing ? "Playing..." : "Paused"}
        </div>
        {/* {socket && (
          <AudioPlayer
            tracks={[
              {
                title: "wdqwdqw",
                artist: "aasdas",
                audioSrc: "/QMIIR_-_plaki_plaki_77789170.mp3",
                image: "/logo.svg",
              },
            ]}
            socket={socket}
            roomId={roomid}
          />
        )} */}
      </div>

      <div className={styles.chat}>
        {/* <Chat socket={socket} roomId={roomid} /> */}
        {socket && <Chat socket={socket} roomId={roomid} />}
      </div>
    </div>
  );
};
