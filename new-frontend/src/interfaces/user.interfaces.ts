export interface IStatus {
  status: boolean;
}

export interface ILoginReq {
  email: string;
  password: string;
}

export interface IVerifyCodeReq {
  email: string;
  password: string;
  code: string;
}

export interface IRegisterReq {
  email: string;
  password: string;
  passwordRepeat: string;
}

interface Room {
  id: string;
  ownerId: number;
  name: string;
}

interface RoomLike {
  id: string;
  userId: number;
  roomId: string;
}

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  aboutMe: string;
  role: string; // Предполагается, что здесь используется перечисление Roles
}

export interface UserByDb extends User {
  room: Room[];
  roomLike: RoomLike[];
}

export interface ILogoutReq {
  id: number;
}
