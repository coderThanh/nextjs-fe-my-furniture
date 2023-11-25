import CardBlog, { CardBlogType } from '@/components-child/card-blog'
import { Content404 } from '@/components-root/404'
import MsgDefault from '@/components-root/message'
import { UseFetchServerArchiveBlog } from '@/hooks/use-blog'
import UIPaination from '@/app/(components)/pagination'

type Props = {
  searchOptions: { [key: string]: string | undefined }
}

export default function BodyArchiveBlogs({ searchOptions }: Props) {
  const data = UseFetchServerArchiveBlog(searchOptions)

  const { items, limit, total } = data ?? ({} as any)

  return (
    <>
      {!data && <Content404 />}
      {items?.length == 0 ? (
        <div className="container">
          <MsgDefault text={'Không có bài viết nào'} />
        </div>
      ) : (
        <></>
      )}
      {items?.length > 0 ? (
        <>
          <section className="archive-loop">
            <div className="container">
              <div className="post-wrap row row-gap-y row-gap-large">
                {items?.map((blog, index) => {
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
                          slugStyle={blog?.styles ? blog?.styles[0]?.slug : ''}
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

          {/* Pagination */}
          <UIPaination totalItems={total} pageSize={limit} isScrollTop={true} />
        </>
      ) : (
        <></>
      )}
    </>
  )
}
