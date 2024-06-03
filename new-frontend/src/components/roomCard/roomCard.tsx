import { RoomCardProps } from "./types/types";
import styles from "./roomCard.module.scss";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuthState } from "../../state/authState";
import { useSetLike } from "../../hooks/room/useSetLike";

export const RoomCard = ({
  roomId,
  title,
  likes,
  imgPath,
  link,
}: RoomCardProps) => {
  const { getUser } = useAuthState();
  const userId = getUser();

  const like = likes?.find(
    (obj) => obj.roomId === roomId && obj.userId === userId
  );

  const [isLiked, setIsLiked] = useState(like ? true : false);
  const [numberOfLikes, setNumberOfLikes] = useState(likes?.length || 0);

  const { mutate, isLoading } = useSetLike();

  const handleLike = () => {
    if (!isLoading) {
      setIsLiked((prevState) => !prevState);
      setNumberOfLikes((prevState) =>
        isLiked ? prevState - 1 : prevState + 1
      );
      mutate({ id: like?.id ? like.id : 0, roomId, userId });
    }
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
          <p>{numberOfLikes}</p>
        </div>
        <Link to={link}>Войти в комнату</Link>
      </div>
    </div>
  );
};
