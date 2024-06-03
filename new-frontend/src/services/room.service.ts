import axios from "axios";
import { RoomResponse, SetLikeReq } from "../interfaces/room.interfaces";

class RoomService {
  private URL = "http://localhost:6069/room-svc";

  async getAllRooms(): Promise<RoomResponse> {
    return axios.get(`${this.URL}/get-all-rooms`);
  }

  async setLike(body: SetLikeReq) {
    return axios.post<SetLikeReq>(`${this.URL}/set-like`, {
      ...body,
    });
  }
}

export default new RoomService();
