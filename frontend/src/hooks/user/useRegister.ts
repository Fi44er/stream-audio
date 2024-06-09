import { useMutation } from "react-query";
import { IRegisterReq } from "../../interfaces/user.interfaces";
import userService from "../../services/user.service";

interface IUseRegister {
  setServerError: any;
  setRegisterData: any;
}
export const useRegister = ({
  setServerError,
  setRegisterData,
}: IUseRegister) => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (body: IRegisterReq) => userService.register({ ...body }),
    onSuccess: (res: any) => {
      setRegisterData(JSON.parse(res.config.data));
    },
    onError: (error: any) => {
      setServerError(error.response.data.message);
    },
  });
};
