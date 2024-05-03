export interface IRoom {
  chat: {
    id: number;
    message: string;
    userId: number;
    roomId: string;
  }[];
  roomUser: {
    userId: number;
    roomId: string;
  }[];
}
