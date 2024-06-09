import { createFileRoute, redirect } from "@tanstack/react-router";
import { Room } from "../../pages/room/room";
import { checkAuthState } from "../../util/checkAuthState";

export const Route = createFileRoute("/room/$roomid")({
  beforeLoad: ({ context }) => {
    const { getUser } = context.auth;
    if (!checkAuthState(getUser())) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: RoomComponent,
});

function RoomComponent() {
  const { roomid } = Route.useParams();

  return <Room roomid={roomid} />;
}
