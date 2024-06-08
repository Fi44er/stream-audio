import { useQuery } from "react-query";
import roomService from "../../services/room.service";

interface IGetRoomById {
  roomid: string;
  //   router: any;
}

export const useGetRoomById = ({ roomid }: IGetRoomById) => {
  return useQuery({
    queryKey: ["getRoomById"],
    queryFn: () => roomService.getRoomById(roomid),
    onSuccess: (data) => {
      if (!data.data) {
        router.navigate({ to: "/" });
      }
    },
  });
};
