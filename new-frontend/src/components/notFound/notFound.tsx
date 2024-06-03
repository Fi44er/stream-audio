import styles from "./notFound.module.scss";

export const NotFound = () => {
  return (
    <>
      <div className={styles.notFound}>
        <figure>
          <div className={styles.sadMac}></div>
          <h1>Page Not Found</h1>
        </figure>
      </div>
    </>
  );
};
