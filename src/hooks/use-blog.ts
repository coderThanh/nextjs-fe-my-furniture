import { LIMIT_RELATED_FETCH } from '@/consts/const'
import { BLOG_SEARCH_FIELD_NAME } from '@/consts/type'
import { isConnectAPI } from '@/helpers'
import { getOptionsQuery } from '@/helpers/method'
import { parseBlogEnity, parseQueryBlogList } from '@/helpers/parseGQL'
import {
  useServerBlogDetail,
  useServerBlogList,
} from '@/services/hooks/hookBlog-sv'
import { use } from 'react'

export const UseFetchServerArchiveBlog = (searchOption: {
  [key: string]: any
}) => {
  const { fetch } = useServerBlogList()

  const options = getOptionsQuery(searchOption, BLOG_SEARCH_FIELD_NAME)

  const res = use(fetch(options))

  var data = null

  if (res?.data?.blogs?.data && res?.data?.blogs?.meta?.pagination) {
    data = parseQueryBlogList(
      res?.data?.blogs?.data,
      res?.data?.blogs?.meta?.pagination,
    )
  }

  return data
}

// ----
export const UseFetchServerBlogDetail = async (slug: string) => {
  const { fetch } = useServerBlogDetail()

  const res = await fetch({ slug: slug })

  var data = null

  if (res?.data?.blogs?.data?.length > 0) {
    data = parseBlogEnity(res?.data?.blogs?.data[0])
  }

  return data
}

export const UseFetchServerBlogsRelated = async (blog) => {
  // const { fetch } = useBlogList()

  const { fetch } = useServerBlogList()

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

  var res = await fetch(options)

  var blogs = null

  if (res?.data?.blogs?.data?.length > 0) {
    blogs = res?.data?.blogs?.data?.map((item) => parseBlogEnity(item))
  }

  return blogs
}
