import { RoomCard } from "../../components/roomCard/roomCard";
import styles from "./index.module.scss";

export const Index = () => {
  return (
    <div className={styles.index}>
      <div className={styles.content}>
        <div className={styles.topRooms}>
          <h1>Топ комнат</h1>
          <div className={styles.cards}>
            <RoomCard
              title="Комната"
              likes={0}
              imgPath="/vaporwave-sun-thumb.jpg"
              link="#"
            />
            <RoomCard
              title="Комната"
              likes={0}
              imgPath="/vaporwave-sun-thumb.jpg"
              link="#"
            />
            <RoomCard title="Комната" likes={0} imgPath="" link="#" />
            <RoomCard
              title="Комната"
              likes={0}
              imgPath="/vaporwave-sun-thumb.jpg"
              link="#"
            />
            <RoomCard
              title="Комната"
              likes={0}
              imgPath="/vaporwave-sun-thumb.jpg"
              link="#"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
