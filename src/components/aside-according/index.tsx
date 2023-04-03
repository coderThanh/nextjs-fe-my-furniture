import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

import styles from "./aside-according.module.scss";
import classNames from "classnames";
import AppConst from "@/models/const";

type AsideAccordingProps = {
  children: ReactNode;
  title: ReactNode;
  isOpen: boolean;
  onClick?: Function;
};

export default function AsideAccording(props: AsideAccordingProps) {
  const childVariant: Variants = {
    closed: {
      opacity: 0,
      visibility: "hidden",
      height: 0,
    },
    open: {
      opacity: 1,
      visibility: "visible",
      height: "fit-content",
    },
  };

  function wrapOnclick() {
    props.onClick != undefined ? props.onClick() : null;
  }

  return (
    <>
      <div
        className={classNames(
          "aside-accord-wrap",
          {
            open: props.isOpen,
          },
          styles.wrap,
          props.isOpen ? styles.open : ""
        )}
      >
        <div className={classNames("inner", styles.inner)}>
          <div onClick={wrapOnclick} className={classNames(styles.title)}>
            {props.title}
          </div>
          <motion.div
            animate={props.isOpen ? "open" : "closed"}
            initial={props.isOpen ? "open" : "closed"}
            transition={{
              duration: AppConst.duration1,
              opacity: { duration: 0.1 },
            }}
            variants={childVariant}
            className={classNames(styles.children)}
          >
            {props.children}
          </motion.div>
          <div className={classNames(styles.bg)}></div>
        </div>
      </div>
    </>
  );
}
