import classNames from 'classnames'
import AppMaterialIcon, { AppMaterialIconType } from '../material-icon'

import styles from './pagination.module.scss'
import { useEffect } from 'react'

export default function Pagination({
  totalItems,
  countOfPage = 12,
  paginatedData,
  currPage,
  setCurrPage,
  isScrollTop = true,
  className,
}) {
  const pageStart = (currPage - 1) * countOfPage
  const totalPage = Math.ceil(totalItems / countOfPage)

  var listNumberShow = Array.from({ length: totalPage }, (_, i) => i + 1)

  const showLength = 6 // so chan
  const numberAround = Math.ceil(showLength / 2)
  const lastIndex = listNumberShow.length

  if (totalPage > showLength) {
    // case start list
    var listBefore = listNumberShow.slice(
      Math.max(currPage - numberAround, 0),
      currPage,
    )

    var listAfter = listNumberShow.slice(
      currPage,
      currPage + numberAround * 2 - listBefore.length,
    )

    listAfter.push(null)
    listAfter.push(listNumberShow[lastIndex - 1])

    // case end list
    if (currPage > listNumberShow.length / 2) {
      listAfter = listNumberShow.slice(currPage, currPage + numberAround)

      listBefore = listNumberShow.slice(0, 1)
      listBefore.push(null)

      listBefore = listBefore.concat(
        listNumberShow.slice(
          currPage - numberAround * 2 + listAfter.length,
          currPage,
        ),
      )
    }

    listNumberShow = [...listBefore, ...listAfter]
  }

  function setPage(idx) {
    if (idx <= 0 || idx > totalPage) {
      return
    }
    setCurrPage(idx)

    if (isScrollTop) window.scrollTo(0, 0)
    paginatedData(totalItems, pageStart, countOfPage)
  }

  useEffect(() => {
    paginatedData(totalItems, pageStart, countOfPage)
  }, [totalItems, pageStart, countOfPage, paginatedData])

  return (
    <div className={classNames(className, styles.wrap, 'pagi-wrap')}>
      {currPage > 1 ? (
        <div
          className={classNames(styles.item, 'pagi-item')}
          onClick={() => setPage(currPage - 1)}
        >
          <AppMaterialIcon size={20} type={AppMaterialIconType.filled}>
            chevron_left
          </AppMaterialIcon>
        </div>
      ) : (
        <></>
      )}
      {listNumberShow.length > 1
        ? listNumberShow.map((item, index) => {
            return (
              <div
                key={index}
                className={classNames(
                  styles.item,
                  'pagi-item',
                  { active: currPage == item },
                  currPage == item ? styles.active : '',
                )}
                onClick={item != currPage ? () => setPage(item) : () => {}}
              >{`${item}`}</div>
            )
          })
        : ''}
      {currPage != totalPage ? (
        <div
          className={classNames(styles.item, 'pagi-item')}
          onClick={() => setPage(currPage + 1)}
        >
          <AppMaterialIcon size={20} type={AppMaterialIconType.filled}>
            navigate_next
          </AppMaterialIcon>
        </div>
      ) : (
        <></>
      )}
    </div>
  )

  //navigate_next
}
