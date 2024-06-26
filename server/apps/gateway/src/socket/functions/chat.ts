import { Message } from 'apps/gateway/proto/builds/chat_svc';
import { Server } from 'socket.io';
import { RoomSvcService } from '../../room-svc/room-svc.service';
import { ChatSvcService } from '../../chat-svc/chat-svc.service';

export const addAndEmitMessage = async (
  server: Server,
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

  server.to(room.roomId).emit('message', message);
};
