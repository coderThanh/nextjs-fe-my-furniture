'use client'

import { useSearchParams } from 'next/navigation'

type Props = {
  total?: number | string
}

export default function SearchTitle({ total }: Props) {
  const searchParams = useSearchParams()

  return (
    <>
      <section className="search-head">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col col-12 col-sm-12  col-lg-9">
              <div className="col-inner">
                <h1 className={'search-title'}>
                  Tìm thấy {total ? total.toLocaleString() : ''} kết quả với từ
                  khóa &quot;
                  {searchParams?.get('keyword')}&quot;
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
