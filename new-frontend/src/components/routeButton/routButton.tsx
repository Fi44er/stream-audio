import { Link } from "@tanstack/react-router";
import styles from "./routButton.module.scss";
import { RouteButtonProps } from "./types/types";

export const RoutButton = ({ text, link, imgPath }: RouteButtonProps) => {
  return (
    <Link to={link} className={styles.button}>
      <img src={imgPath} alt="img" />
      <p>{text}</p>
    </Link>
  );
};
