import axios from "axios";
import { RoomResponse } from "../interfaces/room.interfaces";

class RoomService {
  private URL = "http://localhost:6069/room-svc";

  async getAllRooms(): Promise<RoomResponse> {
    return axios.get(`${this.URL}/get-all-rooms`);
  }
}

export default new RoomService();
