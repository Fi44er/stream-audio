import axios from "axios";
import {
  DeleteLikeReq,
  RoomResponse,
  RoomsResponse,
  SetLikeReq,
} from "../interfaces/room.interfaces";

class RoomService {
  private URL = "http://localhost:6069/room-svc";

  async getAllRooms(): Promise<RoomsResponse> {
    return axios.get(`${this.URL}/get-all-rooms`);
  }

  async setLike(body: SetLikeReq) {
    return axios.post<SetLikeReq>(`${this.URL}/set-like`, {
      ...body,
    });
  }

  async deleteLike(body: DeleteLikeReq) {
    return axios.delete<DeleteLikeReq>(`${this.URL}/delete-like`, {
      data: body,
    });
  }

  async getRoomById(id: string): Promise<RoomResponse> {
    return axios.get(`${this.URL}/get-room-by-id/${id}`);
  }
}

export default new RoomService();
