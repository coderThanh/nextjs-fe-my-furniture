'use client'

import Pagination from '@/components-root/pagination'
import { usePaginationFethingSSR } from '@/hooks/use-pagination'

type Props = {
  totalItems: number
  pageSize?: number
  isScrollTop?: boolean
}

export default function UIPaination({
  totalItems,
  pageSize,
  isScrollTop = true,
}: Props) {
  const { countOfPage, currPage } = usePaginationFethingSSR(pageSize)
  return (
    <>
      <section className="archive-pagination mt-70 mb-80">
        <div className="container">
          <Pagination
            totalItems={totalItems}
            countOfPage={countOfPage}
            currPage={currPage}
            isScrollTop={isScrollTop}
          />
        </div>
      </section>
    </>
  )
}
