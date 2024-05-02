import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddMessageDto } from './dto/addMessage.dto';
import { CreateRoomDto } from './dto/createRoom.dto';
import { CreateRoomResponse } from './response/createRoom.response';
import { FindOneWithRelationsDto } from './dto/findOneWithRelations.dto';

@Injectable()
export class RoomService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateRoomDto): Promise<CreateRoomResponse> {
    const room = await this.prismaService.room.create({
      data: {
        ownerId: dto.ownerId,
        name: dto.name,
      },
    });
    return room;
  }

  async getRoomUser(userId: number) {
    const user = await this.prismaService.roomUser.findUnique({
      where: { userId: userId },
    });
    return user;
  }

  async findOneWithRelations(dto: FindOneWithRelationsDto) {
    const { roomId } = dto;
    const room = await this.prismaService.room.findFirst({
      where: {
        id: {
          equals: roomId,
        },
      },
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
    const room = await this.prismaService.roomUser.upsert({
      where: { userId },
      update: { roomId },
      create: { userId, roomId },
    });
    return room;
  }

  async leaveRoom(userId: number) {
    const user = await this.prismaService.roomUser.findUnique({
      where: { userId },
    });
    if (!user) {
      return;
    }
    const room = await this.prismaService.roomUser.delete({
      where: { userId },
    });
    return room;
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
