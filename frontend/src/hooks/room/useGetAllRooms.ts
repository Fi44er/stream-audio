import { useQuery } from "react-query";
import roomService from "../../services/room.service";

export const useGetAllRooms = () => {
  return useQuery({
    queryKey: ["getAllRooms"],
    queryFn: () => roomService.getAllRooms(),
  });
};
