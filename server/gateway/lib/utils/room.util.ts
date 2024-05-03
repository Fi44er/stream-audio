import { RoomService } from './../src/room/room.service';
import { IRoom } from 'src/room/interfaces/IRoom';
import { Socket } from 'socket.io';
import { AddMessageDto } from 'src/room/dto/addMessage.dto';
import { IMessage } from 'src/room/interfaces/IMessage';
import { UserService } from 'src/user/user.service';
import { UserRes } from 'proto/user_svc';

export const addAndEmitMessage = async (
  client: Socket,
  userId: number,
  addMessageDto: AddMessageDto,
  roomService: RoomService,
) => {
  const room = await roomService.getRoomUser(userId);
  if (!room) return;
  addMessageDto.userId = userId;
  addMessageDto.roomId = room.roomId;

  await roomService.addMessage(addMessageDto);

  client.to(room.roomId).emit('message', addMessageDto.message);
};

// --- Join user in room --- //
export async function joinRoom(
  client: Socket,
  roomId: string,
  userId: number,
  roomService: RoomService,
) {
  client.join(roomId);
  const room = await roomService.findOneWithRelations({ roomId });
  if (!room) return;
  await roomService.updateUserRoom(userId, room.id);
  client.emit('message', getLastMessages(room));
}

// ---  Get last room messages ---  //
const getLastMessages = (room: IRoom): IMessage[] => {
  const limit = 10;
  return room.chat.slice(
    room.chat.length < limit ? 0 : -limit,
    room.chat.length,
  );
};

export const authenticateUser = async (
  client: Socket,
  userService: UserService,
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
