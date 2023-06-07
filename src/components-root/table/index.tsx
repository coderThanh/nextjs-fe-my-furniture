import classNames from "classnames";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";

import styles from "./table.module.scss";

export type TableProps = {
  count: number;
  UiHeader: ReactNode;
  className?: string;
  isHiddenCheckBox?: boolean;
  build: TableBuild;
  onChangeCheckBox?: TableOnChangeCheckBox;
};

export type TableBuild = (index: number) => ReactNode;

export type TableOnChangeCheckBox = (items: boolean[]) => void;

export default function Table(props: TableProps): JSX.Element {
  const [listChecked, setListChecked] = useState<boolean[]>(
    new Array(props.count).fill(false)
  );

  function checkboxChangeAll(event: ChangeEvent) {
    if (listChecked.every((item) => item == true)) {
      setListChecked(listChecked.map((item) => false));
    } else {
      setListChecked(listChecked.map((item) => true));
    }
  }

  function checkboxChange(index: number) {
    setListChecked(
      listChecked.map((item, indexItem) => (index == indexItem ? !item : item))
    );
  }

  useEffect(
    function () {
      props.onChangeCheckBox && props.onChangeCheckBox(listChecked);
    },
    [listChecked, props]
  );

  return (
    <>
      <table className={classNames(styles.table, props.className)}>
        <thead className={styles.thead}>
          <TableTr>
            {!props.isHiddenCheckBox && (
              <TableTh>
                <input
                  type="checkbox"
                  checked={listChecked.every((item) => item == true)}
                  onChange={(event) => checkboxChangeAll(event)}
                />
              </TableTh>
            )}

            {props.UiHeader}
          </TableTr>
        </thead>
        <tbody>
          {listChecked.map((value, index) => {
            return (
              <TableTr key={index}>
                {!props.isHiddenCheckBox && (
                  <TableTd>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(event) => checkboxChange(index)}
                    />
                  </TableTd>
                )}
                {props.build(index)}
              </TableTr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export type TableThProps = {
  children?: ReactNode;
};

export function TableTh(props: TableThProps) {
  return <th className={styles.th}>{props.children}</th>;
}

export type TableTdProps = {
  children?: ReactNode;
  type?: TableTdType;
};

export enum TableTdType {
  secondary = "secondary",
}

export function TableTd(props: TableTdProps) {
  return (
    <td className={classNames(styles.td)}>
      {props.type != TableTdType.secondary ? (
        props.children
      ) : (
        <div className={styles.secondary}>{props.children}</div>
      )}
    </td>
  );
}

export type TableTrProps = {
  children?: ReactNode;
};

export function TableTr(props: TableTrProps) {
  return <tr className={styles.tr}>{props.children}</tr>;
}

export type TableActionProps = {
  children?: ReactNode;
};

export function TableAction(props: TableActionProps) {
  return <div className={styles.actionWrap}>{props.children}</div>;
}
