import classNames from "classnames";
import React from "react";
import { ChangeEvent, CSSProperties, ReactNode, useState } from "react";
import AppButton, { AppButtonColor, AppButtonKind } from "../button";

import styles from "./select-submit.module.scss";

export type SelectSubmitProps = {
  count: number;
  className?: string;
  style?: CSSProperties;
  buildItem: SelectSubmitBuild;
  onSubmit?: SelectSubmitOnSubmit;
};

export type SelectSubmitBuild = (index: number) => ReactNode;
export type SelectSubmitOnSubmit = (value: string) => void;

export default function SelectSubmit(props: SelectSubmitProps): JSX.Element {
  const [selected, setSelected] = useState("");

  function onSubmit() {
    props.onSubmit && props.onSubmit(selected);
  }

  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelected(event.target.value);
  }

  return (
    <div>
      <select
        className={classNames(styles.select, props.className)}
        style={{ ...props.style }}
        onChange={(event) => onChange(event)}
      >
        {new Array(props.count).fill("").map(function (item, index) {
          return props.buildItem(index);
        })}
      </select>
      <AppButton
        text="Áp dụng"
        kind={AppButtonKind.outline}
        color={AppButtonColor.primary}
        onClick={() => onSubmit()}
      />
    </div>
  );
}
