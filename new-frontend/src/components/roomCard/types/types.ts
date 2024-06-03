export type RoomCardProps = {
  roomId: string;
  title: string;
  likes: { id: number; roomId: string; userId: number }[];
  imgPath: string;
  link: string;
};
