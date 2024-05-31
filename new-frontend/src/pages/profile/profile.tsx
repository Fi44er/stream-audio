import styles from "./profile.module.scss";

export const Profile = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.container}>
        <div className={styles.profileInfo}>
          <div>
            <div className={styles.avatar}>
              <img src="src/assets/img/no-avatar.jpg" alt="avatar" />
            </div>
            <button>Редактировать</button>
          </div>
          <div className={styles.userInfo}>
            <h2>Name</h2>
            <div className={styles.aboutMe}>
              <span>Обо мне</span>
              <p>info info info info</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
