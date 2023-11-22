import Footer from '@/app/(components)/footer'
import Header from '@/app/(components)/header'
import BodyArchiveBlogs from '@/app/(post)/(components)/archive-body-loop'
import WrapSWRConfig from '@/components-root/swr-wrap'
import { toTitleCase } from '@/helpers'
import { UseServerFetchCategoryDetail } from '@/hooks/use-category'
import { UseServerFetchStyleDetail } from '@/hooks/use-style'
import UIBreadcrumb from '@/ui/breadcrumb'
import classNames from 'classnames'

type Props = {
  params: { styleSlug: string }
  searchParams: { [key: string]: string | undefined }
}

export default function CategoryPage({ searchParams, params }: Props) {
  const queryOptions = { ...params, ...searchParams }

  const style = UseServerFetchStyleDetail(params?.styleSlug ?? '')

  return (
    <>
      <WrapSWRConfig value={{}}>
        <Header />
        <UIBreadcrumb name={style?.title ? toTitleCase(style?.title) : ''} />
        <section className="archive-head">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="col-inner">
                  <h1 className={classNames('archive-title')}>
                    Phong cách {style?.title}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BodyArchiveBlogs searchOptions={queryOptions} />

        <Footer />
      </WrapSWRConfig>
    </>
  )
}
