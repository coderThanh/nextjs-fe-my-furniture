import classNames from 'classnames'
import AppMaterialIcon, { AppMaterialIconType } from '../material-icon'

import styles from './pagination.module.scss'

export default function Pagination({
  handleClick,
  current,
  count,
  showLength,
  className,
  isHiddenNav = false,
}) {
  // Event onclick
  function onClick(value) {
    handleClick && handleClick(value)
  }

  const isFirst = current == 1
  const isLast = current == count

  const initList = new Array(count).fill(0).map((item, index) => index + 1)

  var listBefore = []
  var listAfter = []

  // Devide list to before and after current
  if (count - current > Math.floor(showLength / 2)) {
    listBefore = initList.slice(
      Math.max(current - Math.floor(showLength / 2), 0),
      current - 1,
    )

    listAfter = initList.slice(
      current,
      Math.max(current + showLength - listBefore.length - 1, -1),
    )
  } else {
    listAfter = initList.slice(current, count)

    listBefore = initList.slice(
      Math.max(current - showLength + listAfter.length, 0),
      current - 1,
    )
  }

  const listShow = [...listBefore, current, ...listAfter]

  return (
    <div className={classNames(className, styles.wrap, 'pagi-wrap')}>
      {!isHiddenNav && !isFirst && (
        <div
          className={classNames(styles.item, 'pagi-item')}
          onClick={() => onClick(current - 1)}
        >
          <AppMaterialIcon size={20} type={AppMaterialIconType.filled}>
            chevron_left
          </AppMaterialIcon>
        </div>
      )}
      {listShow.map((item, index) => {
        return (
          <div
            key={index}
            className={classNames(
              styles.item,
              'pagi-item',
              { active: current == index },
              current == index ? styles.active : '',
            )}
            onClick={item != current ? () => onClick(item) : () => {}}
          >{`${item}`}</div>
        )
      })}
      {!isHiddenNav && !isLast && (
        <div
          className={classNames(styles.item, 'pagi-item')}
          onClick={() => onClick(current + 1)}
        >
          <AppMaterialIcon size={20} type={AppMaterialIconType.filled}>
            navigate_next
          </AppMaterialIcon>
        </div>
      )}
    </div>
  )

  //navigate_next
}
