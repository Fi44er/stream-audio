/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "room_svc";

export interface CreateRoomReq {
  ownerId: number;
  name: string;
}

export interface CreateRoomRes {
  id: string;
  ownerId: number;
  name: string;
}

export interface UserId {
  userId: number;
}

export interface RoomId {
  roomId: string;
}

export interface RoomUser {
  userId: number;
  roomId: string;
}

export interface Chat {
  id: number;
  message: string;
  userId: number;
  roomId: string;
}

export interface Message {
  message: string;
  userId: number;
  roomId: string;
}

export interface Room {
  roomUser: RoomUser[];
  chat: Chat[];
  id: string;
  ownerId: number;
  name: string;
}

export const ROOM_SVC_PACKAGE_NAME = "room_svc";

export interface RoomServiceClient {
  createRoom(request: CreateRoomReq): Observable<CreateRoomRes>;

  getRoomUser(request: UserId): Observable<RoomUser>;

  findOneWithRelations(request: RoomId): Observable<Room>;

  updateUserRoom(request: RoomUser): Observable<RoomUser>;

  leaveRoom(request: UserId): Observable<RoomUser>;

  addMessage(request: Message): Observable<Chat>;
}

export interface RoomServiceController {
  createRoom(request: CreateRoomReq): Promise<CreateRoomRes> | Observable<CreateRoomRes> | CreateRoomRes;

  getRoomUser(request: UserId): Promise<RoomUser> | Observable<RoomUser> | RoomUser;

  findOneWithRelations(request: RoomId): Promise<Room> | Observable<Room> | Room;

  updateUserRoom(request: RoomUser): Promise<RoomUser> | Observable<RoomUser> | RoomUser;

  leaveRoom(request: UserId): Promise<RoomUser> | Observable<RoomUser> | RoomUser;

  addMessage(request: Message): Promise<Chat> | Observable<Chat> | Chat;
}

export function RoomServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createRoom",
      "getRoomUser",
      "findOneWithRelations",
      "updateUserRoom",
      "leaveRoom",
      "addMessage",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("RoomService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("RoomService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ROOM_SERVICE_NAME = "RoomService";
