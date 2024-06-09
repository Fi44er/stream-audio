import { useMutation } from "react-query";
import userService from "../../services/user.service";
import { ILoginReq } from "../../interfaces/user.interfaces";

interface IUseLogin {
  setServerError: any;
  setLoginData: any;
}

export const useLogin = ({ setServerError, setLoginData }: IUseLogin) => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (body: ILoginReq) => userService.login({ ...body }),
    onSuccess: (res: any) => {
      setLoginData(JSON.parse(res.config.data));
    },
    onError: (error: any) => {
      setServerError(error.response.data.message);
    },
  });
};
