import Layout from '@/components-root/layout'
import SEO from '@/components-root/seo'
import WrapSWRConfig from '@/components-root/swr-wrap'
import { parseStyleyEnity } from '@/helpers/parseGQL'
import { UseFallBackArchiveBlog } from '@/hooks/use-blog'
import { UseFetchStyleDetail } from '@/hooks/use-style'
import BodyArchiveBlogs from '@/ui/archive-blog/archive-body-loop'
import UIBreadcrumb from '@/ui/breadcrumb'
import Footer from '@/ui/footer'
import Header from '@/ui/header'
import classNames from 'classnames'

export default function CategoryPage({ fallback, styleEntity }) {
  return (
    <>
      <SEO
        pageTitle={
          'Phong cách ' + (styleEntity?.title ? styleEntity?.title : '')
        }
        description={styleEntity?.expect}
      />

      <WrapSWRConfig value={{ fallback: fallback }}>
        <Layout className="archive-page">
          <Header />
          <UIBreadcrumb
            name={
              'Phong cách ' +
              (styleEntity?.title
                ? styleEntity?.title?.toLocaleLowerCase()
                : '')
            }
          />
          <section className="archive-head">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="col-inner">
                    <h1 className={classNames('archive-title')}>
                      Phong cách {styleEntity?.title}
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

  var styleDetail = await UseFetchStyleDetail(context.query?.styleSlug)

  if (styleDetail != null) {
    styleDetail = parseStyleyEnity(styleDetail)
  }

  return {
    props: {
      styleEntity: styleDetail,
      fallback: {
        ...fallbackBlogs,
      },
    },
  }
}
