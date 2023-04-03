import { ReactNode } from "react";

import styles from "./box-title.module.scss";

type BoxTitleProps = {
  children?: ReactNode;
  title: string;
  descript?: string;
};

export default function BoxTitle(props: BoxTitleProps) {
  return (
    <>
      <h4 className={styles.title}>{props.title}</h4>
      {props.descript && <div className={styles.desc}>{props.descript}</div>}
      {props.children}
    </>
  );
}
