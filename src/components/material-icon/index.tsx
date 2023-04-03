import classNames from "classnames";
import { CSSProperties } from "react";
import { UrlWithStringQuery } from "url";

export type AppMaterialIcon = {
  children: string;
  type: AppMaterialIconType;
  style?: CSSProperties;
  className?: string;
  size?: string | number;
};

export enum AppMaterialIconType {
  outlined = "material-icons-outlined",
  filled = "material-icons",
  round = "material-icons-round",
}

export default function AppMaterialIcon(props: AppMaterialIcon): JSX.Element {
  return (
    <span
      style={{
        ...props.style,
        verticalAlign: "text-bottom",
        fontSize: props.size,
      }}
      className={classNames(props.type, props.className)}
    >
      {props.children}
    </span>
  );
}
