import styles from "./animateBackground.module.scss";
import { AnimateBackgroundProps } from "./types/types";

export const AnimateBackground = ({ children }: AnimateBackgroundProps) => {
  return (
    <div className={styles.animateBackground}>
      <div className={styles.grid}></div>
      {children}
    </div>
  );
};
