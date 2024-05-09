import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";

// socket io
const url = new URL(window.location.href);
const query = url.searchParams;
const token = query.get("token");
const socket = io("localhost:6069?token=" + token);

function App() {
  const [ownerId, setOwnerId] = useState<number>();
  const [roomName, setRoomName] = useState<string>();
  const [roomId, setRoomId] = useState<string>();

  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
    });
  }, []);

  // axios
  const CreateRoom = () => {
    axios.post("http://localhost:6069/room-svc/create-room", {
      ownerId: ownerId,
      name: roomName,
    });
  };

  const handleJoinRoom = () => {
    socket.emit("join", { roomId });
  };

  const handleLeaveRoom = () => {
    socket.emit("leave", { roomId });
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <h2>Create room</h2>
        <input
          type="text"
          placeholder="Owner id"
          onChange={(e) => setOwnerId(+e.target.value)}
        />
        <input
          type="text"
          placeholder="Room name"
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button onClick={CreateRoom}>Submit</button>
      </div>

      <div>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={handleJoinRoom}>Join Room</button>
        <button onClick={handleLeaveRoom}>Leave Room</button>
      </div>
    </>
  );
}

export default App;
