import Pagination from '@/components-root/pagination'
import { useEffect } from 'react'

export default function UIPaination(props) {
  return (
    <>
      <section className="archive-pagination mt-70 mb-80">
        <div className="container">
          <Pagination {...props} />
        </div>
      </section>
    </>
  )
}
