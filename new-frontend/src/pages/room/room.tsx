import styles from "./room.module.scss";
import Cookies from "js-cookie";
import { Chat } from "../../components/chat/chat";
import { io } from "socket.io-client";
import { useEffect } from "react";
import AudioPlayer from "../../components/player/player";

export const Room = ({ roomid }: { roomid: string }) => {
  const token = Cookies.get("accesstoken")?.split(" ")[1];

  const socket = io(`http://localhost:6069?token=${token}`);

  useEffect(() => {
    socket.emit("joinRoom", { roomid });
  }, []);

  return (
    <div className={styles.room}>
      <div className={styles.player}>
        <AudioPlayer
          tracks={[
            {
              title: "wdqwdqw",
              artist: "aasdas",
              audioSrc: "/QMIIR_-_plaki_plaki_77789170.mp3",
              image: "/logo.svg",
            },
          ]}
        />
      </div>

      <div className={styles.chat}>
        <Chat socket={socket} roomId={roomid} />
      </div>
    </div>
  );
};
