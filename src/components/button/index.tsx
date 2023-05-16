import classNames from "classnames";
import { ReactElement, ReactNode } from "react";
import { Url } from "url";
import AppLink from "../link";

import styles from "./button.module.scss";

type AppButtonProps = {
  children?: ReactElement | string;
  className?: string;
  classContentWrap?: string;
  kind?: AppButtonKind;
  color?: AppButtonColor;
  text?: string;
  url?: Url;
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
  const _buttonElement: ReactNode = (
    <button
      onClick={() => props.onClick && props.onClick()}
      className={classNames(
        props.className,
        styles.wrap,
        props.kind == AppButtonKind.default && styles.default,
        props.kind == AppButtonKind.text && styles.text,
        props.kind == AppButtonKind.outline && styles.outline,
        props.color == AppButtonColor.primary && styles.primary,
        props.color == AppButtonColor.white && styles.white,
        props.color == AppButtonColor.dark && styles.dark,
        props.color == AppButtonColor.tertiary && styles.tertiary,
        props.color == AppButtonColor.error && styles.error,
        props.color == AppButtonColor.secondary && styles.secondary
      )}
    >
      <div
        className={classNames(
          styles.inner,
          props.size == AppButtonSize.small && styles.small
        )}
      >
        <div className={classNames(styles.content, props.classContentWrap)}>
          {props.children}
          {props.text && (
            <span className={classNames(styles.textWrap)}>{props.text}</span>
          )}
        </div>
        <div className={styles.bg}></div>
      </div>
    </button>
  );

  return (
    <>
      {
        <AppLink classLink="button-link-out" url={props.url}>
          {_buttonElement}
        </AppLink>
      }
    </>
  );
}
