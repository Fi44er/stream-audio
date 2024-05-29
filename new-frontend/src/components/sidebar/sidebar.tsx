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
        <RoutButton
          text="Главная"
          link="/"
          imgPath="src/assets/icons/home.svg"
        />
        <RoutButton
          text="Профиль"
          link="/profile"
          imgPath="src/assets/icons/profile.svg"
        />
      </div>
    </div>
  );
};
