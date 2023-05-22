import classNames from "classnames";
import { ReactElement } from "react";
import { Url } from "url";
import AppLink from "../link";

import styles from "./button.module.scss";

type AppButtonProps = {
  children?: ReactElement | string;
  className?: string;
  kind?: AppButtonKind;
  color?: AppButtonColor;
  text?: string;
  url?: Url | string;
  size?: AppButtonSize;
  onClick?: Function;
};

export enum AppButtonKind {
  text = "text",
  outline = "outline",
  default = "default",
}

export enum AppButtonColor {
  primary = "primary",
  white = "white",
  dark = "dark",
  error = "error",
  tertiary = "tertiary",
  secondary = "secondary",
}

export enum AppButtonSize {
  default = "default",
  small = "small",
}

// HTMLDivElement
export default function AppButton(props: AppButtonProps) {
  return (
    <>
      <AppLink
        url={props.url}
        classLink={classNames(
          "btn",
          props.className,
          styles.wrap,
          props.kind == AppButtonKind.default && styles.default,
          props.kind == AppButtonKind.text && styles.text + " btn_text",
          props.kind == AppButtonKind.outline &&
            styles.outline + " btn_outline",
          props.color == AppButtonColor.primary && styles.primary + " primary",
          props.color == AppButtonColor.white && styles.white + " white",
          props.color == AppButtonColor.dark && styles.dark + " dark",
          props.color == AppButtonColor.tertiary &&
            styles.tertiary + " tertiary",
          props.color == AppButtonColor.error && styles.error + " error",
          props.color == AppButtonColor.secondary &&
            styles.secondary + " secondary"
        )}
      >
        <div
          className={classNames(
            "btn-inner",
            styles.inner,
            props.size == AppButtonSize.small && styles.small
          )}
          onClick={() => props.onClick && props.onClick()}
        >
          <div className={classNames(styles.content, "btn-content")}>
            {props.children}
            {props.text && (
              <span className={classNames(styles.textWrap, "btn-title")}>
                {props.text}
              </span>
            )}
          </div>
          <div className={classNames(styles.bg, "btn-bg")}></div>
        </div>
      </AppLink>
    </>
  );
}
