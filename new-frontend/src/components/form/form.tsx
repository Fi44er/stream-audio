import { FormProps } from "./types/types";
import styles from "./form.module.scss";
import { Loader } from "../loader/loader";

export const Form = ({
  title,
  children,
  onClick,
  isLoading,
  error,
}: FormProps) => {
  return (
    <div className={styles.signin}>
      {isLoading && (
        <div className={styles.loaderBlock}>
          <Loader />
        </div>
      )}
      <div className={styles.content}>
        <h2>{title}</h2>
        <p className={styles.error}>{error && error}</p>
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
