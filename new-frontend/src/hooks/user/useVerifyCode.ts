import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useMutation } from "react-query";
import { IVerifyCodeReq } from "../../interfaces/user.interfaces";
import userService from "../../services/user.service";
import { useAuthState } from "../../state/authState";

interface IUseVerifyCode {
  setServerError: any;
  router: any;
}

export const useVerifyCode = ({ setServerError, router }: IUseVerifyCode) => {
  const { setUser } = useAuthState();
  return useMutation({
    mutationKey: ["verifyCode"],
    mutationFn: (body: IVerifyCodeReq) => userService.verifyCode({ ...body }),
    onSuccess: () => {
      const token = Cookies.get("accesstoken");

      if (token) {
        const decodeToken: any = jwtDecode(token);
        setUser(decodeToken.id);
      }

      router.navigate({ to: "/profile" });
    },
    onError: (error: any) => {
      setServerError(error.response.data.message);
    },
  });
};
