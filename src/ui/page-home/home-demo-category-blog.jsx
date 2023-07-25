import CardBlog, { CardBlogType } from '@/components-child/card-blog'
import Gap from '@/components-root/gap'
import AppLink from '@/components-root/link'
import { BlogEntity } from '@/models/blog'
import classNames from 'classnames'

export function HomePostByCategoryDemo(props) {
  return (
    <>
      <section className="home-posts">
        <div className="container">
          <Gap large={50} small={30} />
          <div className="row ">
            <div className="col">
              <div className="col-inner">
                <div className={classNames('title_default')}>
                  <h3>{props.title}</h3>
                  <AppLink classLink="title-more" url={'/category'}>
                    Xem tất cả
                  </AppLink>
                </div>
              </div>
            </div>
          </div>
          <div className="post-wrap row row-mt row-large">
            {Array(6)
              .fill(null)
              .map((blog, index) => {
                return (
                  <div className="col col-12 col-sm-6 col-md-4" key={index}>
                    <div className="col-inner">
                      <CardBlog
                        thumbnail={`/images/blogs/blog_${Math.min(
                          index + 1,
                          7,
                        )}.jpg`}
                        imgRatio={56.2}
                        imgRadius={10}
                        type={CardBlogType.default}
                        isShowCate={true}
                        title={
                          'Giảm vật liệu công nghiệp, tăng chất liệu tự nhiên - cách KTS thay đổi không gian sống cho gia chủ'
                        }
                        cateTitle={'cateogry name'}
                        styleTitle={'Style name'}
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </section>
    </>
  )
}
