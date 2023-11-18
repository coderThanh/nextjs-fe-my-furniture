import { LIMIT_FETCH } from '@/consts/const'
import { isConnectAPI } from '@/helpers'
import {
  parseBlogByEntity,
  parseBlogEnity,
  parseLinkEntity,
  parseSEO,
} from '@/helpers/parseGQL'
import { useSWRFetch } from '@/helpers/swr'
import {
  docBlogs,
  docHomeBlogBy,
  docHomeHotBanner,
  docHomeHotBlogs,
} from '@/services/graphql-query'
import { useServerBlogList } from '@/services/hooks/hookBlog-sv'
import {
  useServerHomeBlogBy,
  useServerHomeHotBanner,
  useServerHomeHotBlogs,
  useServerHomeSEO,
} from '@/services/hooks/hookHome-Sv'
import { use } from 'react'

import { unstable_serialize } from 'swr'

//
export const UseHomeSEO = async () => {
  const { fetch } = useServerHomeSEO()

  const isAccept = isConnectAPI()

  if (!isAccept) return {}

  var data = await fetch()

  if (data?.data?.pageHome?.data?.attributes?.seo) {
    data = parseSEO(data?.data?.pageHome?.data?.attributes?.seo)
  }

  return data ?? null
}

//
export const UseGetServerHomeHotBlog = () => {
  const { fetch } = useServerHomeHotBlogs()

  const isAccept = isConnectAPI()

  if (!isAccept) return {}

  var res = use(fetch())

  if (res?.data?.pageHome?.data?.attributes?.hot_blogs?.data) {
    res = res?.data?.pageHome?.data?.attributes?.hot_blogs?.data?.map((item) =>
      parseBlogEnity(item),
    )
  }

  return res
}

//
export const UseGetServerHomeHotBanner = () => {
  const { fetch } = useServerHomeHotBanner()

  const isAccept = isConnectAPI()

  if (!isAccept) return

  var res = use(fetch())

  if (res?.data?.pageHome?.data?.attributes?.hot_banner) {
    res = parseLinkEntity(res?.data?.pageHome?.data?.attributes?.hot_banner)
  }

  console.log(res)

  return res
}

//
export const UseFallbackHomeBlogBy = async () => {
  const { fetch } = useServerHomeBlogBy()

  const isAccept = isConnectAPI()

  if (!isAccept) return

  var data = await fetch()

  return { [unstable_serialize([docHomeBlogBy, {}])]: data }
}

export const useFetchHomeBlogBy = () => {
  const isAccept = isConnectAPI()
  const { fetch } = useServerHomeBlogBy()

  var { isLoading, data } = useSWRFetch(
    isAccept ? docHomeBlogBy : null,
    {},
    isAccept ? fetch : () => {},
  )

  if (data?.pageHome?.data?.attributes?.blog_by) {
    data = data?.pageHome?.data?.attributes?.blog_by.map((item) =>
      parseBlogByEntity(item),
    )
  }

  return { isLoading, data }
}

//
export const UseFallbackHomeBlogs = async () => {
  const { fetch } = useServerBlogList()

  const isAccept = isConnectAPI()

  if (!isAccept) return

  var options = {
    pagination: {
      limit: LIMIT_FETCH,
      start: 0,
    },
    sort: ['createdAt:desc'],
  }

  var data = await fetch(options)

  return {
    [unstable_serialize([docBlogs, options])]: data,
  }
}
