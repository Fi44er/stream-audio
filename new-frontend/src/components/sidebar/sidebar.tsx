import { RoutButton } from "../routeButton/routButton";
import styles from "./sidebar.module.scss";

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <img src="/logo.svg" alt="logo" />
        <h1>Sync Media</h1>
      </div>
      <div className={styles.menuButtons}>
        <RoutButton text="Главная" link="/" imgPath="/icons/home.svg" />
        <RoutButton
          text="Профиль"
          link="/profile"
          imgPath="/icons/profile.svg"
        />
        <RoutButton text="Вход" link="/auth/login" imgPath="/icons/login.svg" />
      </div>
    </div>
  );
};
