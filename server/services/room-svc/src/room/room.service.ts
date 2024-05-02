import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddMessageDto } from './dto/addMessage.dto';

@Injectable()
export class RoomService {
  constructor(private readonly prismaService: PrismaService) {}

  async getRoomUser(userId: number) {
    const user = await this.prismaService.roomUser.findUnique({
      where: { userId: userId },
    });
    return user;
  }

  async findOneWithRelations(roomId: string) {
    const room = await this.prismaService.room.findFirst({
      where: { id: roomId },
      include: {
        roomUser: true,
        chat: true,
      },
    });

    if (!room) {
      throw new BadRequestException('Комната не найдена');
    }

    return room;
  }

  async updateUserRoom(userId: number, roomId: string) {
    await this.prismaService.roomUser.upsert({
      where: { userId },
      update: { roomId },
      create: { userId, roomId },
    });
  }

  async addMessage(addMessageDto: AddMessageDto) {
    const { roomId, userId, message } = addMessageDto;
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
