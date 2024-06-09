import { useQuery } from "react-query";
import userService from "../../services/user.service";

export const useGetAllInfoUser = (idOrEmail: string) => {
  return useQuery({
    queryKey: ["getAllInfoUser"],
    queryFn: () => userService.getAllInfoUser(idOrEmail),
  });
};
