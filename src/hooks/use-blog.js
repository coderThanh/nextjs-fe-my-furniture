import { BLOG_SEARCH_FIELD_NAME } from '@/consts/type'
import { isConnectAPI } from '@/helpers'
import { parseQueryBlogList } from '@/helpers/parseGQL'
import { getOptionsQuery, useSWRFetch } from '@/helpers/swr'
import { docBlogs } from '@/services/graphql-query'
import { useBlogList, useServerBlogList } from '@/services/hooks'
import { useRouter } from 'next/router'
import { unstable_serialize } from 'swr'

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

  console.log(options)

  return { isLoading, data }
}
