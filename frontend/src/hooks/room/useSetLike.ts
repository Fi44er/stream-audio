import { useMutation } from "react-query";
import roomService from "../../services/room.service";
import { SetLikeReq } from "../../interfaces/room.interfaces";

export const useSetLike = () => {
  return useMutation({
    mutationKey: ["setLike"],
    mutationFn: (body: SetLikeReq) => roomService.setLike({ ...body }),
  });
};
