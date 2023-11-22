import SearchTitle from '@/app/(post)/(components)/search-title'
import CardBlog, { CardBlogType } from '@/components-child/card-blog'
import { Content404 } from '@/components-root/404'
import MsgDefault from '@/components-root/message'
import { formatDate } from '@/helpers'
import { UseFetchServerArchiveBlog } from '@/hooks/use-blog'
import UIPaination from '@/ui/pagination'

type Props = {
  searchOptions: { [key: string]: string | undefined }
}

export default function BodySearchBlogs({ searchOptions }: Props) {
  const data = UseFetchServerArchiveBlog(searchOptions)

  const { items, limit, total } = data ?? {}

  return (
    <>
      {!data && <Content404 />}

      {data && <SearchTitle total={total ?? ''} />}
      {items?.length == 0 ? (
        <div className="container">
          <div className="row row-gap-y">
            <div className="col col-12 col-sm-12  col-lg-9">
              <MsgDefault text={'Không có bài viết nào'} />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {items?.length > 0 ? (
        <>
          <section className="search-loop">
            <div className="container">
              <div className="post-wrap row row-gap-y justify-content-center">
                {data?.items?.map((blog, index) => {
                  return (
                    <div className="col col-12 col-sm-12  col-lg-9" key={index}>
                      <div className="col-inner">
                        <CardBlog
                          slug={blog?.slug ?? ''}
                          thumbnail={blog?.thumbnail?.url}
                          thumbnailAlt={blog?.thumbnail?.alt}
                          imgRatio={56.2}
                          imgRadius={10}
                          type={CardBlogType.vertical}
                          title={blog?.title}
                          isShowCate={false}
                          isShowDate={true}
                          date={formatDate(blog.createdAt)}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Pagination */}
          <UIPaination totalItems={total} pageSize={limit} isScrollTop={true} />
        </>
      ) : (
        <></>
      )}
    </>
  )
}
