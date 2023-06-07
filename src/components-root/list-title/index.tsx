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
  onClick?: VoidFunction;
};

export default function ListTitle(props: ListTitleProps) {
  return (
    <>
      <div
        className={classNames(
          "l-title-wrap",
          styles.wrap,
          props.classNameWrap,
          props.isCurrent ? styles.current : ""
        )}
        onClick={(e) => (props.onClick != null ? props.onClick() : null)}
      >
        <AppLink
          url={props.url}
          classLink={classNames("l-title-inner", styles.inner)}
        >
          <div className={classNames("l-title-pref", styles.prefix)}>
            {props.iconMaterial}
          </div>
          <span
            className={classNames(
              "l-title-text",
              styles.text,
              props.classNameText
            )}
          >
            {" "}
            {props.text}
          </span>
          {props.isShowToggle && (
            <span
              className={classNames(
                "material-icons-round",
                styles.suffix,
                props.isToggleOpen ? styles.open : "",
                "l-title-suff"
              )}
            >
              keyboard_arrow_right
            </span>
          )}
          {props.isNotify && (
            <div className={classNames("l-title-notify", styles.notify)}></div>
          )}
          <div className={classNames("l-title-bg", styles.bg)}></div>
        </AppLink>
      </div>
    </>
  );
}
