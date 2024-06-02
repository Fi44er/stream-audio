import { RoomCard } from "../../components/roomCard/roomCard";
import { useGetAllRooms } from "../../hooks/room/useGetAllRooms";
import styles from "./index.module.scss";

export const Index = () => {
  const { data } = useGetAllRooms();
  return (
    <div className={styles.index}>
      <div className={styles.content}>
        <div className={styles.topRooms}>
          <h1>Топ комнат</h1>
          <div className={styles.cards}>
            {data?.data.rooms.map((item) => (
              <RoomCard
                key={item.id}
                title={item.name}
                likes={item.roomLike.length}
                imgPath=""
                link={`/room/${item.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
