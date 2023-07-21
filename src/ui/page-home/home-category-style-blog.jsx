import CardBlog, { CardBlogType } from '@/components-child/card-blog'
import Gap from '@/components-root/gap'
import AppLink from '@/components-root/link'
import GraphQLQuery from '@/models/graphql/graphql-query'
import SWRKey from '@/models/swr-key'
import classNames from 'classnames'
import useSWR from 'swr'

export function HomePostByCategoryAndStyle() {
  // const { data } = useSWR([
  //   SWRKey.pageHomeRes,
  //   GraphQLQuery.getPageHomeData,
  //   { numbers: 6 },
  // ])

  const data = {}

  if (!process.env.NEXT_PUBLIC_HAS_API_DB_CONECT) return <></>

  if (!data?.pageHome) return <></>

  const categoryBlogs = data.pageHome.data.attributes.categories
  const styleBlogs = data.pageHome.data.attributes.styles

  return (
    <>
      {categoryBlogs.data.map((item, index) => (
        <section className="home-posts" key={index}>
          <Gap large={50} small={30} />

          <div className="row ">
            <div className="col">
              <div className="col-inner">
                <div className={classNames('title_default')}>
                  <h3>{item.attributes.title}</h3>
                  <AppLink
                    classLink="title-more"
                    url={'/' + item.attributes.slug}
                  >
                    Xem tất cả
                  </AppLink>
                </div>
              </div>
            </div>
          </div>
          <div className="post-wrap row row-mt row-large">
            {item.attributes.blogs.data &&
              item.attributes.blogs.data.map((blog, index) => {
                return (
                  <div className="col col-12 col-sm-6 col-md-4" key={index}>
                    <div className="col-inner">
                      <CardBlog
                        thumbnail={`/images/blogs/blog_${Math.min(
                          index + 1,
                          6,
                        )}.jpg`}
                        imgRatio={56.2}
                        imgRadius={10}
                        type={CardBlogType.default}
                        isShowCate={true}
                        title={blog.attributes.title}
                        cateTitle={item.attributes.title}
                        styleTitle={
                          blog.attributes.styles?.data[0]?.attributes.title
                        }
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        </section>
      ))}
      {styleBlogs.data.map((item, index) => (
        <section className="home-posts" key={index}>
          <Gap large={50} small={30} />

          <div className="row ">
            <div className="col">
              <div className="col-inner">
                <div className={classNames('title_default')}>
                  <h3>{item.attributes.title}</h3>
                  <AppLink
                    classLink="title-more"
                    url={'/' + item.attributes.slug}
                  >
                    Xem tất cả
                  </AppLink>
                </div>
              </div>
            </div>
          </div>
          <div className="post-wrap row row-mt row-large">
            {item.attributes.blogs.data &&
              item.attributes.blogs.data.map((blog, index) => {
                return (
                  <div className="col col-12 col-sm-6 col-md-4" key={index}>
                    <div className="col-inner">
                      <CardBlog
                        thumbnail={`/images/blogs/blog_${Math.min(
                          index + 1,
                          6,
                        )}.jpg`}
                        imgRatio={56.2}
                        imgRadius={10}
                        type={CardBlogType.default}
                        isShowCate={true}
                        title={blog.attributes.title}
                        cateTitle={
                          blog.attributes.categories?.data[0]?.attributes.title
                        }
                        styleTitle={item.attributes.title}
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        </section>
      ))}
    </>
  )
}
