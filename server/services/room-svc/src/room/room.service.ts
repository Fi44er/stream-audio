import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
