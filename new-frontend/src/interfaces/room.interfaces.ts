interface RoomUser {
  userId: number;
  roomId: string;
}

interface RoomLike {
  id: string;
  userId: number;
  roomId: string;
}

interface Room {
  roomUser: RoomUser[];
  roomLike: RoomLike[];
  id: string;
  ownerId: number;
  name: string;
}

export interface RoomResponse {
  data: {
    rooms: Room[];
  };
}

export interface SetLikeReq {
  userId: number;
  roomId: string;
}

export interface DeleteLikeReq {
  id: string;
}
