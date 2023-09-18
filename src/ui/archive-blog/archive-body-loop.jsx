import CardBlog, { CardBlogType } from '@/components-child/card-blog'
import { Content404 } from '@/components-root/404'
import Loader from '@/components-root/loadder'
import { LIMIT_FETCH } from '@/consts/const'
import { UseFetchArchiveBlog } from '@/hooks/use-blog'
import { usePaginationFething } from '@/hooks/use-pagination'
import UIPaination from '@/ui/pagination'

export default function BodyArchiveBlogs() {
  const { isLoading, data } = UseFetchArchiveBlog()

  const { countOfPage, currPage, setCurrPage, paginatedData } =
    usePaginationFething(LIMIT_FETCH)

  return (
    <>
      {isLoading && (
        <div
          className="container"
          style={{ marginTop: 100, minHeight: '70vh' }}
        >
          <Loader isCenter={true} />
        </div>
      )}
      {!isLoading && !data && <Content404 />}
      {!isLoading && data?.items?.length > 0 ? (
        <>
          <section className="archive-loop">
            <div className="container">
              {data?.items?.length > 0 ? (
                <div className="post-wrap row row-mt row-large">
                  {data?.items?.map((blog, index) => {
                    return (
                      <div className="col col-12 col-sm-6 col-md-4" key={index}>
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
              ) : (
                <></>
              )}
            </div>
          </section>
          <UIPaination
            totalItems={data.total}
            countOfPage={countOfPage}
            paginatedData={paginatedData}
            currPage={currPage}
            setCurrPage={setCurrPage}
          />
        </>
      ) : (
        <></>
      )}
    </>
  )
}
