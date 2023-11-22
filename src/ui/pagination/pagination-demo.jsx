'use client'

import Pagination from '@/components-root/pagination'

export default function UIPainationDemo() {
  return (
    <>
      <section className="archive-pagination mt-70 mb-80">
        <div className="container">
          <Pagination
            totalItems={30}
            countOfPage={12}
            paginatedData={(totalItems, pageStart, countOfPage) => {}}
            currPage={1}
            setCurrPage={(index) => {}}
          />
        </div>
      </section>
    </>
  )
}
