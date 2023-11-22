'use client'

import Footer from '@/app/(components)/footer'
import Header from '@/app/(components)/header'
import CardBlog, { CardBlogType } from '@/components-child/card-blog'
import { ROUTER_URL } from '@/consts/router'
import UIBreadcrumb from '@/ui/breadcrumb'
import UIPainationDemo from '@/ui/pagination/pagination-demo'
import classNames from 'classnames'

export default function CategoryPage() {
  return (
    <>
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
          <div className="post-wrap row row-gap-y row-gap-large">
            {Array(8)
              .fill(null)
              .map((item, index) => {
                return (
                  <div className="col col-12 col-sm-6 col-lg-4" key={index}>
                    <div className="col-inner">
                      <CardBlog
                        slug={ROUTER_URL.blogDetailDemo}
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
      <UIPainationDemo />
      <Footer />
    </>
  )
}
