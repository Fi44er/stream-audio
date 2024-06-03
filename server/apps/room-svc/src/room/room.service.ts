/* eslint-disable prettier/prettier */
import { status } from '@grpc/grpc-js';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  CreateRoomReq,
  CreateRoomRes,
  Room,
  RoomId,
  RoomUser,
  Rooms,
  SetLikeReq,
  Status,
  UserId,
} from 'apps/room-svc/proto/builds/room_svc';
import { PrismaService } from 'apps/room-svc/src/prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private readonly prismaService: PrismaService) {}

  // Get all rooms
  async getAllRooms(): Promise<Rooms> {
    const rooms = await this.prismaService.room.findMany({
      include: {
        roomUser: true,
        roomLike: true,
      },
    });

    return { rooms };
  }

  // Create room
  async createRoom(dto: CreateRoomReq): Promise<CreateRoomRes> {
    const user = await this.prismaService.user.findUnique({
      where: { id: dto.ownerId },
    });
    if (!user)
      throw new RpcException({
        message: 'Пользователь не найден',
        code: status.NOT_FOUND,
      });
    const room = await this.prismaService.room.create({
      data: {
        ownerId: dto.ownerId,
        name: dto.name,
      },
    });
    return room;
  }

  // Get room by user id
  async getRoomUser(dto: UserId): Promise<RoomUser> {
    const { userId } = dto;
    const user = await this.prismaService.roomUser.findUnique({
      where: { userId: userId },
    });
    return user;
  }

  // Get room by room id
  async findOneWithRelations(dto: RoomId): Promise<Room> {
    const { roomId } = dto;
    const room = await this.prismaService.room.findFirst({
      where: { id: roomId },

      include: {
        roomUser: true,
        chat: true,
        roomLike: true,
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

  async setLike(dto: SetLikeReq): Promise<Status> {
    const { id, userId, roomId } = dto;

    await this.prismaService.roomLike.create({
      data: { userId, roomId },
    });

    return { status: true };
  }

  async deleteLike(dto: SetLikeReq): Promise<Status> {
    const { id, userId, roomId } = dto;

    await this.prismaService.roomLike.delete({
      where: { id },
    });

    return { status: true };
  }
}
