import classNames from "classnames";
import { ReactNode } from "react";

import styles from "./card-wrap.module.scss";

type CardWrapProps = {
  children?: ReactNode;
};

export default function CardWrap(props: CardWrapProps) {
  return (
    <>
      <div className={classNames(styles.wrap)}>
        <div className={classNames(styles.inner)}>
          {props.children}
          <div className={classNames(styles.bg)}></div>
        </div>
      </div>
    </>
  );
}
