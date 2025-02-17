import UIBreadcrumb from '@/app/(components)/breadcrumb'
import Footer from '@/app/(components)/footer'
import UIPainationDemo from '@/app/(components)/pagination/pagination-demo'
import CardBlog, { CardBlogType } from '@/components-child/card-blog'
import { ROUTER_URL } from '@/consts/router'
import classNames from 'classnames'

export default function SearchPage() {
  return (
    <>
      <UIBreadcrumb name={'Search'} />
      <section className="search-head">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col col-12 col-sm-12 col-lg-9">
              <div className="col-inner">
                <h1 className={classNames('search-title')}>
                  Tìm thấy 52073 kết quả với từ khóa &quot;search key&quot;
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="search-loop">
        <div className="container">
          <div className="post-wrap row row-gap-y justify-content-center">
            {Array(8)
              .fill(null)
              .map((item, index) => {
                return (
                  <div className="col col-12  col-lg-9" key={index}>
                    <div className="col-inner">
                      <CardBlog
                        slug={ROUTER_URL.blogDetailDemo}
                        thumbnail={`/images/blogs/blog_${index + 1}.jpg`}
                        imgRatio={56.2}
                        imgRadius={10}
                        type={CardBlogType.vertical}
                        title="'Giảm vật liệu công nghiệp, tăng chất liệu tự nhiên - cách KTS thay đổi không gian sống cho gia chủ"
                        isShowCate={false}
                        isShowDate={true}
                        date={'13/09/2023'}
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
