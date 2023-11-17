import { LIMIT_RELATED_FETCH } from '@/consts/const'
import { BLOG_SEARCH_FIELD_NAME } from '@/consts/type'
import { isConnectAPI } from '@/helpers'
import { getOptionsQuery } from '@/helpers/method'
import { parseBlogEnity, parseQueryBlogList } from '@/helpers/parseGQL'
import { useSWRFetch } from '@/helpers/swr'
import { docBlogDetail, docBlogs } from '@/services/graphql-query'
import {
  useBlogList,
  useServerBlogDetail,
  useServerBlogList,
} from '@/services/hooks/hookBlog'

import { useRouter, useSearchParams } from 'next/navigation'
import { unstable_serialize } from 'swr'

// ----
export const UseFallBackArchiveBlog = async (query) => {
  const { fetch } = useServerBlogList()

  const isAccept = isConnectAPI()
  if (!isAccept) return {}

  const options = getOptionsQuery(query, BLOG_SEARCH_FIELD_NAME)

  const data = await fetch(options)

  return { [unstable_serialize([docBlogs, options])]: data }
}

export const UseFetchArchiveBlog = () => {
  var searchParams = useSearchParams()

  const isAccept = isConnectAPI()

  const { fetch } = useBlogList()

  const options = getOptionsQuery(searchParams, BLOG_SEARCH_FIELD_NAME)

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
export const UseFallBackBlogRealted = async (catIDs, styleIds, exceptIds) => {
  const { fetch } = useServerBlogList()

  const isAccept = isConnectAPI()
  if (!isAccept) return {}

  var searchOption = {}

  if (exceptIds?.length > 0) {
    searchOption['id'] = { notIn: exceptIds }
  }

  if (catIDs?.length > 0) {
    if (searchOption['or']) {
      searchOption['or'].push({ categories: { id: { in: catIDs } } })
    } else {
      searchOption['or'] = [{ categories: { id: { in: catIDs } } }]
    }
  }

  if (styleIds?.length > 0) {
    if (searchOption['or']) {
      searchOption['or'].push({ styles: { id: { in: styleIds } } })
    } else {
      searchOption['or'] = [{ styles: { id: { in: styleIds } } }]
    }
  }

  var options = {
    pagination: {
      limit: LIMIT_RELATED_FETCH,
    },
    searchOption: searchOption,
    sort: ['createdAt:desc'],
  }

  const data = await fetch(options)

  return { [unstable_serialize([docBlogs, options])]: data }
}

export const UseFetchBlogsRelated = (blog) => {
  const { fetch } = useBlogList()

  const catIDs = blog?.categories?.map((item) => item.id) ?? []
  const styleIds = blog?.styles?.map((item) => item.id) ?? []

  var searchOption = {}

  if (blog?.id) {
    searchOption['id'] = { notIn: [blog?.id] }
  }

  if (catIDs?.length > 0) {
    if (searchOption['or']) {
      searchOption['or'].push({ categories: { id: { in: catIDs } } })
    } else {
      searchOption['or'] = [{ categories: { id: { in: catIDs } } }]
    }
  }

  if (styleIds?.length > 0) {
    if (searchOption['or']) {
      searchOption['or'].push({ styles: { id: { in: styleIds } } })
    } else {
      searchOption['or'] = [{ styles: { id: { in: styleIds } } }]
    }
  }

  var options = {
    pagination: {
      limit: LIMIT_RELATED_FETCH,
    },
    searchOption: searchOption,
    sort: ['createdAt:desc'],
  }

  const { isLoading, data } = useSWRFetch(docBlogs, options, fetch)

  var blogs = []

  if (data?.blogs?.data?.length > 0) {
    blogs = data?.blogs?.data?.map((item) => parseBlogEnity(item))
  }

  return { isLoading: isLoading, data: blogs }
}
