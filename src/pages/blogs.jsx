import Layout from '@/components-root/layout'
import SEO from '@/components-root/seo'
import WrapSWRConfig from '@/components-root/swr-wrap'
import { parseCategoryEnity } from '@/helpers/parseGQL'
import { UseFetchCategoryDetail } from '@/hooks'
import { UseFallBackArchiveBlog } from '@/hooks/use-blog'
import BodyArchiveBlogs from '@/ui/archive-blog/archive-body-loop'
import UIBreadcrumb from '@/ui/breadcrumb'
import Footer from '@/ui/footer'
import Header from '@/ui/header'
import classNames from 'classnames'

export default function CategoryPage({ fallback }) {
  return (
    <>
      <SEO pageTitle={'Bài viết'} />

      <WrapSWRConfig value={{ fallback: fallback }}>
        <Layout className="archive-page">
          <Header />
          <UIBreadcrumb name={'Bài viết'} />
          <section className="archive-head">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="col-inner">
                    <h1 className={classNames('archive-title')}>Bài viết</h1>
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

  return {
    props: {
      fallback: {
        ...fallbackBlogs,
      },
    },
  }
}
