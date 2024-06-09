import { useMutation } from "react-query";
import { ILogoutReq } from "../../interfaces/user.interfaces";
import userService from "../../services/user.service";

interface IUseLogout {
  router: any;
  editUser: () => void;
}

export const useLogout = ({ router, editUser }: IUseLogout) => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: (body: ILogoutReq) => userService.logout({ ...body }),
    onSuccess: () => {
      editUser();
      router.navigate({ to: "/" });
    },
  });
};
