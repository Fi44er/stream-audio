import axios from "axios";
import {
  ILoginReq,
  IRegisterReq,
  IVerifyCodeReq,
} from "../interfaces/user.interfaces";

class UserService {
  private URL = "http://localhost:6069/user-svc";
  async login(body: ILoginReq) {
    return axios.post<ILoginReq>(`${this.URL}/login`, {
      ...body,
    });
  }

  async verifyCode(body: IVerifyCodeReq) {
    return axios.post<IVerifyCodeReq>(`${this.URL}/verify-code`, {
      ...body,
    });
  }

  async register(body: IRegisterReq) {
    return axios.post<IRegisterReq>(`${this.URL}/register`, {
      ...body,
    });
  }
}

export default new UserService();
