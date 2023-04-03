import classNames from "classnames";
import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={classNames(styles.wrap)}>
      <div className={classNames("container-fluid")}>
        <div className={classNames(styles.inner)}>
          <p>Copyright 2023 PT Design</p>
        </div>
        <div className={classNames(styles.bg)}></div>
      </div>
    </footer>
  );
}
