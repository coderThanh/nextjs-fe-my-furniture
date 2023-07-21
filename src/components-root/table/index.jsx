import classNames from 'classnames'
import { useEffect, useState } from 'react'

import styles from './table.module.scss'

export default function Table(props) {
  const [listChecked, setListChecked] = useState(
    new Array(props.count).fill(false),
  )

  function checkboxChangeAll(event) {
    if (listChecked.every((item) => item == true)) {
      setListChecked(listChecked.map((item) => false))
    } else {
      setListChecked(listChecked.map((item) => true))
    }
  }

  function checkboxChange(index) {
    setListChecked(
      listChecked.map((item, indexItem) => (index == indexItem ? !item : item)),
    )
  }

  useEffect(
    function () {
      props.onChangeCheckBox && props.onChangeCheckBox(listChecked)
    },
    [listChecked, props],
  )

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
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export function TableTh(props) {
  return <th className={styles.th}>{props.children}</th>
}

export const TableTdType = {
  secondary: 'secondary',
}

export function TableTd(props) {
  return (
    <td className={classNames(styles.td)}>
      {props.type != TableTdType.secondary ? (
        props.children
      ) : (
        <div className={styles.secondary}>{props.children}</div>
      )}
    </td>
  )
}

export function TableTr(props) {
  return <tr className={styles.tr}>{props.children}</tr>
}

export function TableAction(props) {
  return <div className={styles.actionWrap}>{props.children}</div>
}
