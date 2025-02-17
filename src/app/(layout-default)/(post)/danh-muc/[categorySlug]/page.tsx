import UIBreadcrumb from '@/app/(components)/breadcrumb'
import BodyArchiveBlogs from '@/app/(layout-default)/(post)/(components)/archive-body-loop'
import WrapSWRConfig from '@/components-root/swr-wrap'
import { toTitleCase } from '@/helpers'
import { getMetaRobots } from '@/helpers/method'
import { CategoryEntity } from '@/helpers/parseGQL'
import { UseServerFetchCategoryDetail } from '@/hooks/use-category'
import classNames from 'classnames'
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { categorySlug: string }
  searchParams: { [key: string]: string | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  var data: CategoryEntity | null = await UseServerFetchCategoryDetail(
    params.categorySlug,
  )

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: data?.title,
    description: data?.expect,
    openGraph: {
      images: [data?.thumbnail?.url ?? '', ...previousImages],
    },
    robots: getMetaRobots(),
  }
}

export default async function CategoryPage({ searchParams, params }: Props) {
  const queryOptions = { ...params, ...searchParams }

  const category = await UseServerFetchCategoryDetail(
    params?.categorySlug ?? '',
  )

  return (
    <>
      <WrapSWRConfig>
        <UIBreadcrumb
          name={category?.title ? toTitleCase(category?.title) : ''}
        />
        <section className="archive-head">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="col-inner">
                  <h1 className={classNames('archive-title')}>
                    Danh mục {category?.title}
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
