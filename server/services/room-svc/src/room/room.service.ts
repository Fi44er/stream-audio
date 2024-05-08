/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import {
  CreateRoomReq,
  CreateRoomRes,
  Room,
  RoomId,
  RoomUser,
  UserId,
} from 'proto/builds/room_svc';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRoom(dto: CreateRoomReq): Promise<CreateRoomRes> {
    const room = await this.prismaService.room.create({
      data: {
        ownerId: dto.ownerId,
        name: dto.name,
      },
    });
    return room;
  }

  async getRoomUser(dto: UserId): Promise<RoomUser> {
    const { userId } = dto;
    const user = await this.prismaService.roomUser.findUnique({
      where: { userId: userId },
    });
    return user;
  }

  async findOneWithRelations(dto: RoomId): Promise<Room> {
    const { roomId } = dto;
    const room = await this.prismaService.room.findFirst({
      where: { id: roomId },

      include: {
        roomUser: true,
        chat: true,
      },
    });
    if (!room) {
      return;
    }
    return room;
  }

  async updateUserRoom(dto: RoomUser): Promise<RoomUser> {
    const { userId, roomId } = dto;
    const room = await this.prismaService.roomUser.upsert({
      where: { userId },
      update: { roomId },
      create: { userId, roomId },
    });
    return room;
  }

  async leaveRoom(dto: UserId): Promise<RoomUser> {
    const { userId } = dto;
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
}
