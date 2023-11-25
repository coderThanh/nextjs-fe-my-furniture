import Footer from '@/app/(components)/footer'
import Header from '@/app/(components)/header'
import BodyArchiveBlogs from '@/app/(post)/(components)/archive-body-loop'
import WrapSWRConfig from '@/components-root/swr-wrap'
import { toTitleCase } from '@/helpers'
import { getMetaRobots } from '@/helpers/method'
import { UseServerFetchStyleDetail } from '@/hooks/use-style'
import UIBreadcrumb from '@/app/(components)/breadcrumb'
import classNames from 'classnames'
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { styleSlug: string }
  searchParams: { [key: string]: string | undefined }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  var data =
    (await UseServerFetchStyleDetail(params?.styleSlug ?? '')) ?? ({} as any)

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: data?.title,
    description: data?.description,
    openGraph: {
      images: [data?.thumbnail?.url, ...previousImages],
    },
    robots: getMetaRobots(),
  }
}

export default async function CategoryPage({ searchParams, params }: Props) {
  const queryOptions = { ...params, ...searchParams }

  const style = await UseServerFetchStyleDetail(params?.styleSlug ?? '')

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
