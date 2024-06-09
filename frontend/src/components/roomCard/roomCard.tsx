import { RoomCardProps } from "./types/types";
import styles from "./roomCard.module.scss";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuthState } from "../../state/authState";
import { useSetLike } from "../../hooks/room/useSetLike";
import { useDeleteLike } from "../../hooks/room/useDeleteLike";
import { checkAuthState } from "../../util/checkAuthState";

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

  const { mutate: setLikeMutate, isLoading: setLikeIsLoading } = useSetLike();
  const { mutate: deleteLikeMutate, isLoading: deleteLikeIsLoading } =
    useDeleteLike();

  const handleLike = () => {
    if (!setLikeIsLoading && !deleteLikeIsLoading && checkAuthState(userId)) {
      setIsLiked((prevState) => !prevState);
      setNumberOfLikes((prevState) =>
        isLiked ? prevState - 1 : prevState + 1
      );
      if (!isLiked) {
        setLikeMutate({ roomId, userId });
      } else {
        const id = `${userId}_${roomId}`;
        deleteLikeMutate({ id: id });
      }
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
