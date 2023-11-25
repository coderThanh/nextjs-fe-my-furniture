import classNames from 'classnames'

import { parseQueryOptions, serializerQueryOptions } from '@/helpers/method'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import styles from './pagination.module.scss'

export interface Props {
  totalItems: number
  countOfPage: number
  showLength?: number // so chan
  currPage: number
  isScrollTop?: boolean
  className?: string
  isUseClick?: boolean
  handleClick?: (nextPage: number) => void
}

export default function Pagination({
  totalItems,
  countOfPage = 12,
  showLength = 6,
  currPage,
  className,
  isScrollTop = true,
  isUseClick = false,
  handleClick,
}: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const totalPage = Math.ceil(totalItems / countOfPage)

  // var listNumberShow = Array.from({ length: totalPage }, (_, i) => i + 1)
  var listNumberShow: (number | null)[] = Array.from(
    { length: totalPage },
    (_, i) => i + 1,
  )

  const numberAround = Math.ceil(showLength / 2)
  const lastIndex = listNumberShow.length

  if (totalPage > showLength) {
    // case start list
    var listBefore: (number | null)[] = listNumberShow.slice(
      Math.max(currPage - numberAround, 0),
      currPage,
    )

    var listAfter: (number | null)[] = listNumberShow.slice(
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

  const renderItem = (paged: number | null, index: number) => {
    const query = parseQueryOptions(searchParams)

    if (paged == 1) {
      query.skip = ''
    } else if (paged && paged > 1) {
      query.skip = (paged - 1) * countOfPage
    }

    const url: any = !serializerQueryOptions(query)
      ? pathname
      : pathname + '?' + serializerQueryOptions(query)

    const pag = {
      label: paged?.toString() ?? '...',
      href: url,
    }

    if (paged && currPage == paged) {
      return (
        <div
          key={index}
          className={classNames(
            styles.item,
            'pagi-item',
            'active',
            styles.active,
          )}
        >
          {pag.label}
        </div>
      )
    }

    if (paged == null) {
      return (
        <div key={index} className={classNames(styles.item, 'pagi-item')}>
          {pag.label}
        </div>
      )
    }

    // handle click
    if (isUseClick) {
      return (
        <div
          key={index}
          className={classNames(styles.item, 'pagi-item')}
          onClick={() => (paged && handleClick ? handleClick(paged) : null)}
        >
          {pag.label}
        </div>
      )
    }

    // RETURN UNACTIVE PAGINATION
    return (
      <Link
        key={index}
        className={classNames(styles.item, 'pagi-item')}
        href={pag.href}
        scroll={isScrollTop}
      >
        {pag.label}
      </Link>
    )
  }

  return (
    <div className={classNames(className, styles.wrap, 'pagi-wrap')}>
      {/* {currPage > 1 ? (
        <div className={classNames(styles.item, 'pagi-item')}>
          <AppMaterialIcon size={20} type={AppMaterialIconType.filled}>
            chevron_left
          </AppMaterialIcon>
        </div>
      ) : (
        <></>
      )} */}
      {listNumberShow.length > 1
        ? listNumberShow.map((item, index) => {
            return renderItem(item, index)
          })
        : ''}
      {/* {currPage != totalPage ? (
        <AppLink url={``} className={classNames(styles.item, 'pagi-item')}>
          <AppMaterialIcon size={20} type={AppMaterialIconType.filled}>
            navigate_next
          </AppMaterialIcon>
        </AppLink>
      ) : (
        <></>
      )} */}
    </div>
  )

  //navigate_next
}
