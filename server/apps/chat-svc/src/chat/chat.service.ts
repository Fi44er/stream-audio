import { Injectable } from '@nestjs/common';
import { Chat, Message } from 'apps/chat-svc/proto/builds/chat_svc';
import { PrismaService } from 'apps/chat-svc/src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}
  async addMessage(dto: Message): Promise<Chat> {
    const { roomId, userId, message } = dto;
    const roomMessage = await this.prismaService.chat.create({
      data: {
        roomId,
        userId,
        message,
      },
    });
    return roomMessage;
  }
}
