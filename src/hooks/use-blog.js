import { LIMIT_RELATED_FETCH } from '@/consts/const'
import { BLOG_SEARCH_FIELD_NAME } from '@/consts/type'
import { isConnectAPI } from '@/helpers'
import { parseBlogEnity, parseQueryBlogList } from '@/helpers/parseGQL'
import { getOptionsQuery, useSWRFetch } from '@/helpers/swr'
import {
  docBlogDetail,
  docBlogs,
  docBlogsRelated,
} from '@/services/graphql-query'
import {
  useBlogList,
  useBlogRelatedList,
  useServerBlogDetail,
  useServerBlogList,
  useServerBlogRelatedList,
} from '@/services/hooks'
import { useRouter } from 'next/router'
import { unstable_serialize } from 'swr'

// ----
export const UseFallBackArchiveBlog = async (query) => {
  const { fetch } = useServerBlogList()

  const isAccept = isConnectAPI()
  if (!isAccept) return {}

  const options = getOptionsQuery(query, BLOG_SEARCH_FIELD_NAME, true)

  const data = await fetch(options)

  return { [unstable_serialize([docBlogs, options])]: data }
}

export const UseFetchArchiveBlog = () => {
  const router = useRouter()
  const { query } = router

  const isAccept = isConnectAPI()

  const { fetch } = useBlogList()

  const options = getOptionsQuery(query, BLOG_SEARCH_FIELD_NAME, true)

  var { isLoading, data } = useSWRFetch(
    isAccept ? docBlogs : null,
    options,
    isAccept ? fetch : () => {},
  )

  if (data?.blogs?.data && data?.blogs?.meta?.pagination) {
    data = parseQueryBlogList(data?.blogs?.data, data?.blogs?.meta?.pagination)
  }

  return { isLoading, data }
}

// ----
export const UseFallBackBlogDetail = async (slug) => {
  const { fetch } = useServerBlogDetail()

  const data = await fetch({ slug: slug })

  var blog = null

  if (data?.blogs?.data?.length > 0) {
    blog = parseBlogEnity(data?.blogs?.data[0])
  }

  return {
    blog: blog,
    fallback: {
      [unstable_serialize([docBlogDetail, slug])]: data,
    },
  }
}

// ----
export const UseFallBackBlogRealted = async (catIDs, styleIDs, exceptIds) => {
  const { fetch } = useServerBlogRelatedList()

  const isAccept = isConnectAPI()
  if (!isAccept) return {}

  const options = {
    limit: LIMIT_RELATED_FETCH,
    exceptIds: exceptIds,
    categoryIds: catIDs,
    styleIds: styleIDs,
  }

  const data = await fetch(options)

  return { [unstable_serialize([docBlogsRelated, options])]: data }
}

export const UseFetchBlogsRelated = (blog) => {
  const { fetch } = useBlogRelatedList()

  const options = {
    limit: LIMIT_RELATED_FETCH,
    exceptIds: blog?.id ? [blog?.id] : [],
    categoryIds: blog?.categories?.map((item) => item.id) ?? [],
    styleIds: blog?.styles?.map((item) => item.id) ?? [],
  }

  const { isLoading, data } = useSWRFetch(docBlogsRelated, options, fetch)

  var blogs = []

  if (data?.blogs?.data?.length > 0) {
    blogs = data?.blogs?.data?.map((item) => parseBlogEnity(item))
  }

  return { isLoading, data: blogs }
}
