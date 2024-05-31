import { useMutation } from "react-query";
import { IVerifyCodeReq } from "../../interfaces/user.interfaces";
import userService from "../../services/user.service";

interface IUseVerifyCode {
  setServerError: any;
  router: any;
}

export const useVerifyCode = ({ setServerError, router }: IUseVerifyCode) => {
  return useMutation({
    mutationKey: ["verifyCode"],
    mutationFn: (body: IVerifyCodeReq) => userService.verifyCode({ ...body }),
    onSuccess: () => {
      router.navigate({ to: "/profile" });
    },
    onError: (error: any) => {
      setServerError(error.response.data.message);
    },
  });
};
