import { createFileRoute } from "@tanstack/react-router";
import { Room } from "../../pages/room/room";

export const Route = createFileRoute("/room/$roomid")({
  component: RoomComponent,
});

function RoomComponent() {
  const { roomid } = Route.useParams();
  return <Room roomid={roomid} />;
}
