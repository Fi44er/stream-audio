export type IStateCreateRoom = {
  id?: number
  ownerId: number
  name: string
}

export type ResponseJWT = {
  id: number
  login: string
  role: string
  iat: number
  exp: number
}

export type IStateJoinRoom = {

  roomId: number
}
