import UIBreadcrumb from '@/app/(components)/breadcrumb'
import BodyArchiveBlogs from '@/app/(layout-default)/(post)/(components)/archive-body-loop'
import WrapSWRConfig from '@/components-root/swr-wrap'
import { toTitleCase } from '@/helpers'
import { getMetaRobots } from '@/helpers/method'
import { StyleEntity } from '@/helpers/parseGQL'
import { UseServerFetchStyleDetail } from '@/hooks/use-style'
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
  var data: StyleEntity =
    (await UseServerFetchStyleDetail(params?.styleSlug ?? '')) ?? ({} as any)

  return {
    title: data?.title,
    description: data?.expect,
    robots: getMetaRobots(),
  }
}

export default async function CategoryPage({ searchParams, params }: Props) {
  const queryOptions = { ...params, ...searchParams }

  const style = await UseServerFetchStyleDetail(params?.styleSlug ?? '')

  return (
    <>
      <WrapSWRConfig>
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
      </WrapSWRConfig>
    </>
  )
}
