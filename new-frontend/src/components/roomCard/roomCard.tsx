import { RoomCardProps } from "./types/types";
import styles from "./roomCard.module.scss";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export const RoomCard = ({ title, likes, imgPath, link }: RoomCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };
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
          <img
            src={isLiked ? "/icons/like-2.svg" : "/icons/like-1.svg"}
            alt="like"
            onClick={handleLike}
          />
          <p>{likes}</p>
        </div>
        <Link to={link}>Войти в комнату</Link>
      </div>
    </div>
  );
};
