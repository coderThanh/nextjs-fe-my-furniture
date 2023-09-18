import CardBlog, { CardBlogType } from '@/components-child/card-blog'
import Layout from '@/components-root/layout'
import SEO from '@/components-root/seo'
import UIBreadcrumb from '@/ui/breadcrumb'
import Footer from '@/ui/footer'
import Header from '@/ui/header'
import UIPaination from '@/ui/pagination'
import classNames from 'classnames'

export default function CategoryPage() {
  return (
    <>
      <SEO
        pageTitle={'Arcgive page title'}
        description={'Generated by create next app'}
      />

      <Layout className="archive-page">
        <Header />
        <UIBreadcrumb name={'Archive name'} />
        <section className="archive-head">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="col-inner">
                  <h1 className={classNames('archive-title')}>Read our blog</h1>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="archive-loop">
          <div className="container">
            <div className="post-wrap row row-mt row-large">
              {Array(8)
                .fill(null)
                .map((item, index) => {
                  return (
                    <div className="col col-12 col-sm-6 col-md-4" key={index}>
                      <div className="col-inner">
                        <CardBlog
                          thumbnail={`/images/blogs/blog_${index + 1}.jpg`}
                          imgRatio={56.2}
                          imgRadius={10}
                          type={CardBlogType.default}
                          isShowCate={true}
                          title="'Giảm vật liệu công nghiệp, tăng chất liệu tự nhiên - cách KTS thay đổi không gian sống cho gia chủ"
                          cateTitle="Category name"
                          styleTitle="Style name"
                        />
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </section>
        {/* <UIPaination /> */}
        <Footer />
      </Layout>
    </>
  )
}
