import Layout from '@/components-root/layout'
import SEO from '@/components-root/seo'
import WrapSWRConfig from '@/components-root/swr-wrap'
import { toCapitalizeCase } from '@/helpers'
import { parseCategoryEnity } from '@/helpers/parseGQL'
import { UseServerFetchCategoryDetail } from '@/hooks'
import { UseFallBackArchiveBlog } from '@/hooks/use-blog'
import BodyArchiveBlogs from '@/ui/archive-blog/archive-body-loop'
import UIBreadcrumb from '@/ui/breadcrumb'
import Footer from '@/ui/footer'
import Header from '@/ui/header'
import classNames from 'classnames'

export default function CategoryPage({ fallback, category }) {
  return (
    <>
      <SEO
        pageTitle={
          'Danh mục ' +
          (category?.title ? toCapitalizeCase(category?.title) : '')
        }
        description={category?.expect}
      />

      <WrapSWRConfig value={{ fallback: fallback }}>
        <Layout className="archive-page">
          <Header />
          <UIBreadcrumb
            name={
              'Danh mục ' +
              (category?.title ? toCapitalizeCase(category?.title) : '')
            }
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
          <BodyArchiveBlogs />
          <Footer />
        </Layout>
      </WrapSWRConfig>
    </>
  )
}

export async function getServerSideProps(context) {
  const fallbackBlogs = await UseFallBackArchiveBlog(context.query)

  var categoryDetail = await UseServerFetchCategoryDetail(
    context.query?.categorySlug,
  )

  if (categoryDetail != null) {
    categoryDetail = parseCategoryEnity(categoryDetail)
  }

  return {
    props: {
      category: categoryDetail,
      fallback: {
        ...fallbackBlogs,
      },
    },
  }
}
