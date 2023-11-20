import Footer from '@/app/(components)/footer'
import Header from '@/app/(components)/header'
import BodyArchiveBlogs from '@/app/(post)/(components)/archive-body-loop'
import WrapSWRConfig from '@/components-root/swr-wrap'
import { DESCRIPTION_PAGE, TITLE_PAGE } from '@/consts/const'
import { getMetaRobots } from '@/helpers/method'
import UIBreadcrumb from '@/ui/breadcrumb'
import classNames from 'classnames'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: TITLE_PAGE,
  description: DESCRIPTION_PAGE,
  robots: getMetaRobots(),
}

type Props = {
  searchParams: { [key: string]: string | undefined }
}

export default function CategoryPage({ searchParams }: Props) {
  return (
    <>
      <WrapSWRConfig value={{}}>
        <Header />
        <UIBreadcrumb name={'Bài viết mới'} />
        <section className="archive-head">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="col-inner">
                  <h1 className={classNames('archive-title')}>Bài viết mới</h1>
                </div>
              </div>
            </div>
          </div>
        </section>
        <BodyArchiveBlogs searchOptions={searchParams} />
        <Footer />
      </WrapSWRConfig>
    </>
  )
}
