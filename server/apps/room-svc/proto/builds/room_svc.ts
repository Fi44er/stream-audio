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

export interface RoomLike {
  id: number;
  userId: number;
  roomId: string;
}

export interface Room {
  roomUser: RoomUser[];
  chat: Chat[];
  roomLike: RoomLike[];
  id: string;
  ownerId: number;
  name: string;
}

export interface RoomWithoutChat {
  roomUser: RoomUser[];
  roomLike: RoomLike[];
  id: string;
  ownerId: number;
  name: string;
}

export interface Rooms {
  rooms: RoomWithoutChat[];
}

export interface Chat {
  id: number;
  message: string;
  userId: number;
  roomId: string;
}

export interface EmptyReq {
}

export interface SetLikeReq {
  id: number;
  userId: number;
  roomId: string;
}

export interface Status {
  status: boolean;
}

export const ROOM_SVC_PACKAGE_NAME = "room_svc";

export interface RoomServiceClient {
  getAllRooms(request: EmptyReq): Observable<Rooms>;

  createRoom(request: CreateRoomReq): Observable<CreateRoomRes>;

  getRoomUser(request: UserId): Observable<RoomUser>;

  findOneWithRelations(request: RoomId): Observable<Room>;

  updateUserRoom(request: RoomUser): Observable<RoomUser>;

  leaveRoom(request: UserId): Observable<RoomUser>;

  setLike(request: SetLikeReq): Observable<Status>;

  deleteLike(request: SetLikeReq): Observable<Status>;
}

export interface RoomServiceController {
  getAllRooms(request: EmptyReq): Promise<Rooms> | Observable<Rooms> | Rooms;

  createRoom(request: CreateRoomReq): Promise<CreateRoomRes> | Observable<CreateRoomRes> | CreateRoomRes;

  getRoomUser(request: UserId): Promise<RoomUser> | Observable<RoomUser> | RoomUser;

  findOneWithRelations(request: RoomId): Promise<Room> | Observable<Room> | Room;

  updateUserRoom(request: RoomUser): Promise<RoomUser> | Observable<RoomUser> | RoomUser;

  leaveRoom(request: UserId): Promise<RoomUser> | Observable<RoomUser> | RoomUser;

  setLike(request: SetLikeReq): Promise<Status> | Observable<Status> | Status;

  deleteLike(request: SetLikeReq): Promise<Status> | Observable<Status> | Status;
}

export function RoomServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getAllRooms",
      "createRoom",
      "getRoomUser",
      "findOneWithRelations",
      "updateUserRoom",
      "leaveRoom",
      "setLike",
      "deleteLike",
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
