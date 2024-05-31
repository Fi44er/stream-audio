import axios from "axios";
import { ILoginReq, IVerifyCodeReq } from "../interfaces/user.interfaces";

class UserService {
  private URL = "http://localhost:6069";
  async login(body: ILoginReq) {
    return axios.post<ILoginReq>(`${this.URL}/user-svc/login`, {
      ...body,
    });
  }

  async verifyCode(body: IVerifyCodeReq) {
    return axios.post<IVerifyCodeReq>(`${this.URL}/user-svc/verify-code`, {
      ...body,
    });
  }
}

export default new UserService();
