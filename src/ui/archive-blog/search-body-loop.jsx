import CardBlog, { CardBlogType } from '@/components-child/card-blog'
import { Content404 } from '@/components-root/404'
import Loader from '@/components-root/loadder'
import MsgDefault from '@/components-root/message'
import { LIMIT_FETCH } from '@/consts/const'
import { formatDate } from '@/helpers'
import { UseFetchArchiveBlog } from '@/hooks/use-blog'
import { usePaginationFething } from '@/hooks/use-pagination'
import UIPaination from '@/ui/pagination'
import { useRouter } from 'next/router'

export default function BodySearchBlogs() {
  const router = useRouter()
  const { query } = router

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
      {!isLoading && data && (
        <section className="search-head">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col col-12 col-sm-12  col-lg-9">
                <div className="col-inner">
                  <h1 className={'search-title'}>
                    Tìm thấy {data?.total} kết quả với từ khóa &quot;
                    {query.keyword}&quot;
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {!isLoading && data?.items?.length == 0 ? (
        <div className="container">
          <div className="post-wrap row row-mt row-large justify-content-center">
            <div className="col col-12 col-sm-12  col-lg-9">
              <MsgDefault text={'Không có bài viết nào'} />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {!isLoading && data?.items?.length > 0 ? (
        <>
          <section className="search-loop">
            <div className="container">
              <div className="post-wrap row row-mt row-large justify-content-center">
                {data?.items?.map((blog, index) => {
                  return (
                    <div className="col col-12 col-sm-12  col-lg-9" key={index}>
                      <div className="col-inner">
                        <CardBlog
                          thumbnail={blog?.thumbnail?.url}
                          thumbnailAlt={blog?.thumbnail?.alt}
                          imgRatio={56.2}
                          imgRadius={10}
                          type={CardBlogType.vertical}
                          title={blog?.title}
                          isShowCate={false}
                          isShowDate={true}
                          date={formatDate(blog.updatedAt)}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
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
