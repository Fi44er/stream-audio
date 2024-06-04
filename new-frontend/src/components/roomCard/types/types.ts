export type RoomCardProps = {
  roomId: string;
  title: string;
  likes?: { id: string; roomId: string; userId: number }[];
  imgPath: string;
  link: string;
};
