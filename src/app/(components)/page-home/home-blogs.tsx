import CardBlog, { CardBlogType } from '@/components-child/card-blog'
import Gap from '@/components-root/gap'
import Loader from '@/components-root/loadder'
import { LIMIT_FETCH } from '@/consts/const'
import { parseBlogEnity, parsePagination } from '@/helpers/parseGQL'
import { useSWRFetch } from '@/helpers/swr'
import { docBlogs } from '@/services/graphql-query'
import { useBlogList } from '@/services/hooks/hookBlog'
import classNames from 'classnames'
import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function HomeBlogs({}) {
  // fetch
  const [stBlogs, setBlogs] = useState([])
  const [stSkip, setSkip] = useState(0)
  const [stIsFull, setIsFull] = useState(false)

  const { fetch } = useBlogList()

  var { data, isLoading } = useSWRFetch(
    docBlogs,
    {
      pagination: {
        limit: LIMIT_FETCH,
        start: stSkip,
      },
      sort: ['createdAt:desc'],
    },
    fetch,
  )

  useEffect(() => {
    if (data?.blogs?.data?.length > 0) {
      var blogs = data?.blogs?.data?.map((item) => parseBlogEnity(item))

      var newBlogs

      if (stSkip > 0) {
        newBlogs = [...stBlogs, ...blogs]
      } else {
        newBlogs = blogs
      }

      setBlogs(newBlogs)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (data?.blogs?.meta?.pagination) {
      var pagination = parsePagination(data?.blogs?.meta?.pagination)
      if (stBlogs.length >= pagination?.total) {
        setIsFull(true)
      }
    }
  }, [data, stBlogs])

  // Set sticky on sctroll
  const ref = useRef(null)
  const isInview = useInView(ref)

  useEffect(() => {
    if (isInview && !isLoading && !stIsFull) {
      setSkip(stBlogs.length)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInview])

  return (
    <>
      <section className="home-posts">
        <Gap large={50} small={30} />
        <div className="container">
          {stBlogs.length > 0 ? (
            <div className="row ">
              <div className="col">
                <div className="col-inner">
                  <div className={classNames('title_default')}>
                    <h3>Mới nhất</h3>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="post-wrap row row-gap-y row-gap-large">
            {stBlogs?.map((blog, index) => {
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
                      styleTitle={blog?.styles ? blog?.styles[0]?.title : ''}
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

      {/* Check scoll end */}
      <div ref={ref}>
        {isLoading && (
          <>
            <div className="container mt-60 mb-60 ">
              <Loader isCenter={true} />
            </div>
          </>
        )}
      </div>
    </>
  )
}
