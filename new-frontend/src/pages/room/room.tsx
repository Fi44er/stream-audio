import styles from "./room.module.scss";
import Cookies from "js-cookie";
import { Chat } from "../../components/chat/chat";
import { io } from "socket.io-client";
import { useEffect } from "react";

export const Room = ({ roomid }: { roomid: string }) => {
  const token = Cookies.get("token")?.split(" ")[1];
  const socket = io(`http://localhost:6069?token=${token}`);

  useEffect(() => {
    socket.emit("joinRoom", { roomid });
  }, []);

  useEffect(() => {});
  return (
    <div className={styles.room}>
      <div className={styles.player}></div>

      <div className={styles.chat}>
        <Chat socket={socket} roomId={roomid} />
      </div>
    </div>
  );
};
