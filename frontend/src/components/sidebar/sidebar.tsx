import { useAuthState } from "../../state/authState";
import { checkAuthState } from "../../util/checkAuthState";
import { RoutButton } from "../routeButton/routButton";
import styles from "./sidebar.module.scss";

export const Sidebar = () => {
  const state = useAuthState().getUser();
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarHeader}>
          <img src="/logo.svg" alt="logo" />
          <h1>Sync Media</h1>
        </div>
        <div className={styles.menuButtons}>
          <RoutButton text="Главная" link="/" imgPath="/icons/home.svg" />
          {checkAuthState(state) ? (
            <RoutButton
              text="Профиль"
              link="/profile"
              imgPath="/icons/profile.svg"
            />
          ) : (
            <RoutButton
              text="Вход"
              link="/auth/login"
              imgPath="/icons/login.svg"
            />
          )}
        </div>
      </div>
    </div>
  );
};
