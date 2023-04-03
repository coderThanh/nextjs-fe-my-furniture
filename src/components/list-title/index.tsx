import styles from "./list-title.module.scss";
import classNames from "classnames";
import { Url } from "url";
import { CSSProperties, ReactNode } from "react";
import AppLink from "../link";

type ListTitleProps = {
  url?: Url;
  text: string;
  iconMaterial?: ReactNode;
  isShowToggle?: boolean;
  isToggleOpen?: boolean;
  isNotify?: boolean;
  isCurrent?: boolean;
  classNameWrap?: string;
  classNameText?: string;
  style?: CSSProperties;
};

export default function ListTitle(props: ListTitleProps) {
  return (
    <>
      <div
        className={classNames(
          styles.wrap,
          props.classNameWrap,
          props.isCurrent ? styles.current : ""
        )}
      >
        <AppLink url={props.url} classLink={classNames(styles.link)}>
          <div className={classNames(styles.inner)} style={props.style}>
            <div className={classNames(styles.prefix)}>
              {props.iconMaterial}
            </div>
            <span className={classNames(styles.text, props.classNameText)}>
              {" "}
              {props.text}
            </span>
            {props.isShowToggle && (
              <span
                className={classNames(
                  "material-icons-round",
                  styles.suffix,
                  props.isToggleOpen ? styles.open : ""
                )}
              >
                keyboard_arrow_right
              </span>
            )}
            {props.isNotify && (
              <div className={classNames(styles.notify)}></div>
            )}
            <div className={classNames(styles.bg)}></div>
          </div>
        </AppLink>
      </div>
    </>
  );
}
