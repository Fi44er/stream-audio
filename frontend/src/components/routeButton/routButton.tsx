import { Link, useLocation } from "@tanstack/react-router";
import styles from "./routButton.module.scss";
import { RouteButtonProps } from "./types/types";

export const RoutButton = ({ text, link, imgPath }: RouteButtonProps) => {
  const { pathname } = useLocation();
  const active =
    pathname === link ||
    (pathname === "/auth/register" && link === "/auth/login")
      ? styles.active
      : "";

  return (
    <Link to={link} className={styles.button}>
      <img src={imgPath} alt="img" />
      <p className={active}>{text}</p>
    </Link>
  );
};
