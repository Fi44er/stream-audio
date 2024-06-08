import axios from "axios";
import {
  ILoginReq,
  ILogoutReq,
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
    return axios.post<IVerifyCodeReq>(
      `${this.URL}/verify-code`,
      {
        ...body,
      },
      {
        withCredentials: true,
      }
    );
  }

  async register(body: IRegisterReq) {
    return axios.post<IRegisterReq>(`${this.URL}/register`, {
      ...body,
    });
  }

  async getAllInfoUser(idOrEmail: string) {
    return axios.get(`${this.URL}/get-all-info-user/${idOrEmail}`);
  }

  async logout(body: ILogoutReq) {
    return axios.post<ILogoutReq>(
      `${this.URL}/logout`,
      { ...body },
      {
        withCredentials: true,
      }
    );
  }
}

export default new UserService();
