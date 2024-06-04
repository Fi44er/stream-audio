import { useMutation } from "react-query";
import roomService from "../../services/room.service";
import { DeleteLikeReq } from "../../interfaces/room.interfaces";

export const useDeleteLike = () => {
  return useMutation({
    mutationKey: ["setLike"],
    mutationFn: (body: DeleteLikeReq) => roomService.deleteLike({ ...body }),
  });
};
