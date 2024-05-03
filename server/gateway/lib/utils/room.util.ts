import { Socket } from 'socket.io';
import { UserSvcService } from 'src/user-svc/user-svc.service';
import { UserRes } from 'proto/builds/user_svc';
import { Message, Room } from 'proto/builds/room_svc';
import { RoomSvcService } from 'src/room-svc/room-svc.service';

export const addAndEmitMessage = async (
  client: Socket,
  userId: number,
  message: Message,
  roomService: RoomSvcService,
) => {
  const room = await roomService.getRoomUser({ userId });
  if (!room) return;
  message.userId = userId;
  message.roomId = room.roomId;

  await roomService.addMessage(message);

  client.to(room.roomId).emit('message', message.message);
};

// --- Join user in room --- //
export async function joinRoom(
  client: Socket,
  roomId: string,
  userId: number,
  roomService: RoomSvcService,
) {
  client.join(roomId);
  const room = await roomService.findOneWithRelations({ roomId });
  if (!room) return;
  await roomService.updateUserRoom({ userId, roomId });
  client.emit('message', getLastMessages(room));
}

// ---  Get last room messages ---  //
const getLastMessages = (room: Room): Message[] => {
  const limit = 10;
  return room.chat.slice(
    room.chat.length < limit ? 0 : -limit,
    room.chat.length,
  );
};

export const authenticateUser = async (
  client: Socket,
  userService: UserSvcService,
): Promise<UserRes> => {
  const token = client.handshake.query.token;
  if (!token) {
    client.disconnect(true);
    return;
  }

  const payload = await userService.verifyAccessToken({
    token: token.toString(),
  });

  if (!payload) {
    client.disconnect(true);
    return;
  }

  const user = await userService.findOne({
    idOrEmail: String(payload.id),
  });

  if (!user) {
    client.disconnect(true);
    return;
  }

  return user;
};
