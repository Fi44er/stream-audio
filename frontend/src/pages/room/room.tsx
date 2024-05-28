import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRef, useState } from "react";
import { io } from "socket.io-client";
import { IStateCreateRoom, IStateJoinRoom, ResponseJWT } from "./types/types";
import { Chat } from "../../components/Chat/chat";
import style from "./room.module.scss";
export const Room = (): JSX.Element => {
  const [stateCreateRoom, setStateCreateRoom] = useState<IStateCreateRoom>({
    ownerId: 0,
    name: "",
  });
  const statePushRoom = useRef<IStateJoinRoom>({
    roomId: 0,
  });
  const token = Cookies.get("token");
  const test = token?.split(" ")[1];
  console.log(test);

  function createRoomHandler() {
    if (token) {
      const decodedToken: ResponseJWT = jwtDecode(token);
      console.log(token);

      console.log(decodedToken);
      setStateCreateRoom({ ...stateCreateRoom, ownerId: decodedToken.id });
      axios
        .post<IStateCreateRoom>(
          "http://localhost:6069/room-svc/create-room",
          stateCreateRoom
        )
        .then((res) => {
          const { data } = res;
          if (data.id) {
            statePushRoom.current.roomId = data.id;
          }
        });
    }
  }

  console.log(statePushRoom.current);

  function joinRoomHandler() {
    const socket = io(`http://localhost:6069?token=${test}`);
    socket.emit("join", statePushRoom.current);
    socket.on("error", (data) => {
      console.log(data);
    });
    socket.on("message", (data) => {
      console.log(data);
    });
  }

  const roomId = useRef({
    roomId: "",
  });
  return (
    <>
      <div className={style.room}>
        <div className={style.block}></div>

        <div className={style.chat}>
          <Chat />
        </div>
      </div>
      {/* <Form title='Создать комнату' onClick={joinRoomHandler} >
				<input type='text' placeholder='Название комнаты' onChange={e => {
					roomId.current.roomId = e.target.value;
				}} />
			</Form> */}
    </>
  );
};
