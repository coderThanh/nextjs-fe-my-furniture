import CardBlog, { CardBlogType } from '@/components-child/card-blog'
import Gap from '@/components-root/gap'
import AppLink from '@/components-root/link'
import Loader from '@/components-root/loadder'
import { parseStringTitle } from '@/helpers'
import { useFetchHomeBlogBy } from '@/hooks'
import classNames from 'classnames'

export function HomeBlogsBy() {
  const { isLoading, data } = useFetchHomeBlogBy()

  return (
    <>
      {isLoading && (
        <>
          <div className="container mt-60 mb-60">
            <Loader />
          </div>
        </>
      )}
      {!isLoading && data?.length > 0
        ? data?.map((item, index) => (
            <section className="home-posts" key={index}>
              <Gap large={50} small={30} />
              <div className="container">
                <div className="row ">
                  <div className="col">
                    <div className="col-inner">
                      <div className={classNames('title_default')}>
                        <h3>{parseStringTitle(item?.title)}</h3>
                        <AppLink classLink="title-more" url={item?.slug}>
                          Xem tất cả
                        </AppLink>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="post-wrap row row-gap-y row-gap-large">
                  {item?.blogs?.map((blog, index) => {
                    return (
                      <div className="col col-12 col-sm-6 col-lg-4" key={index}>
                        <div className="col-inner">
                          <CardBlog
                            thumbnail={blog?.thumbnail?.url}
                            thumbnailAlt={blog?.thumbnail?.alt}
                            imgRatio={56.2}
                            imgRadius={10}
                            type={CardBlogType.default}
                            isShowCate={true}
                            title={blog?.title}
                            cateTitle={
                              blog?.categories ? blog?.categories[0]?.title : ''
                            }
                            styleTitle={
                              blog?.styles ? blog?.styles[0]?.title : ''
                            }
                            slug={blog?.slug}
                            slugCate={
                              blog?.categories ? blog?.categories[0]?.slug : ''
                            }
                            slugStyle={
                              blog?.styles ? blog?.styles[0]?.slug : ''
                            }
                            cateImg={
                              blog?.categories
                                ? blog?.categories[0]?.thumbnail?.url
                                : ''
                            }
                            cateImgAlt={
                              blog?.categories
                                ? blog?.categories[0]?.thumbnail?.alt
                                : ''
                            }
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          ))
        : ''}
    </>
  )
}
