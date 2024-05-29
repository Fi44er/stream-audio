import { RoomCardProps } from "./types/types";
import styles from "./roomCard.module.scss";
import { Link } from "@tanstack/react-router";

export const RoomCard = ({ title, likes, imgPath, link }: RoomCardProps) => {
  return (
    <div className={styles.roomCard}>
      <div className={styles.roomImg}>
        <img
          src={imgPath ? imgPath : "src/assets/img/image-upload.png"}
          alt="img"
        />
      </div>
      <h3>{title}</h3>
      <div className={styles.cardFooter}>
        <div className={styles.likes}>
          <img src="src/assets/icons/like-2.svg" alt="like" />
          <p>{likes}</p>
        </div>
        <Link to={link}>Войти в комнату</Link>
      </div>
    </div>
  );
};
