import classNames from "classnames";
import React from "react";
import { CSSProperties } from "react";
import AppButton, {
  AppButtonColor,
  AppButtonKind,
  AppButtonSize,
} from "../button";
import AppMaterialIcon, { AppMaterialIconType } from "../material-icon";

import styles from "./pagination.module.scss";

export type PaginationProps = {
  count: number;
  current: number;
  showLength: number;
  isHiddenNav?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: PaginationOnClick;
};

export type PaginationOnClick = (value: number) => void;

export default function Pagination(props: PaginationProps): JSX.Element {
  function onClick(value: number) {
    props.onClick && props.onClick(value);
  }

  const isFirst = props.current == 1;
  const isLast = props.current == props.count;

  const initList = new Array(props.count)
    .fill(0)
    .map((item, index) => index + 1);

  var listBefore: number[] = [];
  var listAfter: number[] = [];

  if (props.count - props.current > Math.floor(props.showLength / 2)) {
    listBefore = initList.slice(
      Math.max(props.current - Math.floor(props.showLength / 2), 0),
      props.current - 1
    );

    listAfter = initList.slice(
      props.current,
      Math.max(props.current + props.showLength - listBefore.length - 1, -1)
    );
  } else {
    listAfter = initList.slice(props.current, props.count);

    listBefore = initList.slice(
      Math.max(props.current - props.showLength + listAfter.length, 0),
      props.current - 1
    );
  }

  const listShow: number[] = [...listBefore, props.current, ...listAfter];

  return (
    <div
      style={{ ...props.style }}
      className={classNames(props.className, styles.wrap)}
    >
      {!props.isHiddenNav && !isFirst && (
        <AppButton
          className={classNames(styles.item)}
          kind={AppButtonKind.text}
          color={AppButtonColor.secondary}
          onClick={() => onClick(props.current - 1)}
        >
          <AppMaterialIcon size={20} type={AppMaterialIconType.filled}>
            chevron_left
          </AppMaterialIcon>
        </AppButton>
      )}
      {listShow.map((item, index) => {
        return (
          <AppButton
            key={index}
            className={classNames(styles.item)}
            kind={
              item == props.current ? AppButtonKind.default : AppButtonKind.text
            }
            color={AppButtonColor.secondary}
            onClick={item != props.current ? () => onClick(item) : () => {}}
            text={`${item}`}
          ></AppButton>
        );
      })}
      {!props.isHiddenNav && !isLast && (
        <AppButton
          className={classNames(styles.item)}
          kind={AppButtonKind.text}
          color={AppButtonColor.secondary}
          onClick={() => onClick(props.current + 1)}
        >
          <AppMaterialIcon size={20} type={AppMaterialIconType.filled}>
            navigate_next
          </AppMaterialIcon>
        </AppButton>
      )}
    </div>
  );

  //navigate_next
}
