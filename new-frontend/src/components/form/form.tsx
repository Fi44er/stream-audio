import { FormProps } from "./types/types";
import styles from "./form.module.scss";

export const Form = ({ title, children, onClick }: FormProps) => {
  return (
    <div className={styles.signin}>
      <div className={styles.content}>
        <h2>{title}</h2>
        <form className={styles.form} onSubmit={onClick} noValidate>
          {children}
          <div>
            <button type="submit">Отправить</button>
          </div>
        </form>
      </div>
    </div>
  );
};
