import { useState } from "react";
import { useGetAllInfoUser } from "../../hooks/user/useGetAllInfoUser";
import { UserByDb } from "../../interfaces/user.interfaces";
import { useAuthState } from "../../state/authState";
import styles from "./profile.module.scss";
import { RoomCard } from "../../components/roomCard/roomCard";

export const Profile = () => {
  const { getUser } = useAuthState();
  const { data } = useGetAllInfoUser(getUser().toString());
  const userData: UserByDb = data?.data;
  console.log(userData);

  enum RoomsBlockStatus {
    LIKES = "likes",
    MY = "my",
  }

  const [roomsBlockStatus, setRoomsBlockStatus] = useState<RoomsBlockStatus>(
    RoomsBlockStatus.MY
  );

  return (
    <div className={styles.profile} id="profile">
      <div className={styles.container}>
        <div className={styles.profileInfo}>
          <div>
            <div className={styles.avatar}>
              <img src="src/assets/img/no-avatar.jpg" alt="avatar" />
            </div>
            <button>Редактировать</button>
          </div>
          <div className={styles.userInfo}>
            <h2>{userData?.name}</h2>
            <div className={styles.aboutMe}>
              <span>Обо мне</span>
              <p>{userData?.aboutMe}</p>
            </div>
          </div>
        </div>

        <div className={styles.rooms}>
          <div className={styles.menu}>
            <button>Мои комнаты</button>
            <button>Понравившиеся комнаты</button>
          </div>
          {roomsBlockStatus === RoomsBlockStatus.MY ? (
            <div className={styles.myRooms}>
              <h2>Мои комнаты</h2>
              <div className={styles.cards}>
                {userData?.room.map((item) => (
                  <RoomCard
                    roomId={item.id}
                    key={item.id}
                    title={item.name}
                    imgPath=""
                    link={`/room/${item.id}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.likedRooms}>
              <h2>Понравившиеся комнаты</h2>
              <div className={styles.cards}>
                {userData?.roomLike.map((item) => (
                  <RoomCard
                    roomId={item.id}
                    key={item.id}
                    title={"wwqd"}
                    imgPath=""
                    link={`/room/${item.id}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
