'use client'

import CardBlog, { CardBlogType } from '@/components-child/card-blog'
import Loader from '@/components-root/loadder'
import { LIMIT_FETCH } from '@/consts/const'
import { parseBlogEnity, parsePagination } from '@/helpers/parseGQL'
import { useSWRFetch } from '@/helpers/swr'
import { docBlogs } from '@/services/graphql-query'
import { useBlogList } from '@/services/hooks/hookBlog'
import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type Props = {
  data: any[]
}

export default function HomeBlogsShow({ data }: Props) {
  //hook
  const { fetch } = useBlogList()

  //
  const [stBlogs, setBlogs] = useState([...data])
  const [stSkip, setSkip] = useState(0)
  const [stIsFull, setIsFull] = useState(false)
  const [stWasFirstRender, setWasFirstRender] = useState(false)

  // Set sticky on sctroll
  const ref = useRef(null)
  const isInview = useInView(ref, { once: stIsFull, margin: '500px' }) // stop handle if full

  //
  const { data: fetched, isLoading } = useSWRFetch(
    docBlogs,
    {
      pagination: {
        limit: LIMIT_FETCH,
        start: stSkip,
      },
      sort: ['createdAt:desc'],
    },
    stWasFirstRender ? fetch : () => {},
  )

  //
  useEffect(() => {
    setWasFirstRender(true)
  }, [])

  // Merge data
  useEffect(() => {
    if (fetched?.data?.blogs?.data?.length > 0) {
      var blogs = fetched?.data?.blogs?.data?.map((item) =>
        parseBlogEnity(item),
      )

      setBlogs([...stBlogs, ...blogs])
    }
    // Handle infinite render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetched])

  // Handle full fetched
  useEffect(() => {
    if (fetched?.data?.blogs?.meta?.pagination) {
      var pagination = parsePagination(fetched?.data?.blogs?.meta?.pagination)

      if (stBlogs.length >= pagination?.total) {
        setIsFull(true)
      }
    }
  }, [
    fetched,
    fetched?.data?.blogs?.meta?.pagination,
    stBlogs.length,
    stWasFirstRender,
  ])

  // Run fetching
  useEffect(() => {
    if (isInview && !isLoading && !stIsFull) {
      setSkip(stBlogs.length)
    }
  }, [isInview, isLoading, stBlogs.length, stIsFull])

  return (
    <>
      {/* Show Loop */}
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
                  cateTitle={blog?.categories ? blog?.categories[0]?.title : ''}
                  styleTitle={blog?.styles ? blog?.styles[0]?.title : ''}
                  slug={blog?.slug}
                  slugCate={blog?.categories ? blog?.categories[0]?.slug : ''}
                  slugStyle={blog?.styles ? blog?.styles[0]?.slug : ''}
                  cateImg={
                    blog?.categories ? blog?.categories[0]?.thumbnail?.url : ''
                  }
                  cateImgAlt={
                    blog?.categories ? blog?.categories[0]?.thumbnail?.alt : ''
                  }
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Check scoll end */}
      <div ref={ref}>
        {isLoading && (
          <>
            <div className="mt-60 mb-60 ">
              <Loader isCenter={true} />
            </div>
          </>
        )}
      </div>
    </>
  )
}
