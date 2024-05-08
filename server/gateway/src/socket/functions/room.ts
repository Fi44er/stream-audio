/* eslint-disable prettier/prettier */
import { Message } from 'proto/builds/chat_svc';
import { Room } from 'proto/builds/room_svc';
import { UserRes } from 'proto/builds/user_svc';
import { Socket } from 'socket.io';
import { RoomSvcService } from 'src/room-svc/room-svc.service';
import { UserSvcService } from 'src/user-svc/user-svc.service';

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
  if (!room.chat) return [];
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
