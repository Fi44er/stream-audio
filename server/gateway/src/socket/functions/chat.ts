import { Message } from 'proto/builds/chat_svc';
import { Socket } from 'socket.io';
import { ChatSvcService } from 'src/chat-svc/chat-svc.service';
import { RoomSvcService } from 'src/room-svc/room-svc.service';

export const addAndEmitMessage = async (
  client: Socket,
  userId: number,
  message: Message,
  roomService: RoomSvcService,
  chatSvcService: ChatSvcService,
) => {
  const room = await roomService.getRoomUser({ userId });
  if (!room) return;
  message.userId = userId;
  message.roomId = room.roomId;

  await chatSvcService.addMessage(message);

  client.to(room.roomId).emit('message', message.message);
};
