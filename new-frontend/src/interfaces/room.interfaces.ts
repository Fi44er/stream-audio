interface RoomUser {
  userId: number;
  roomId: string;
}

interface RoomLike {
  id: number;
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
  id: number;
  userId: number;
  roomId: string;
}
