import { LIMIT_FETCH } from '@/consts/const'
import { isConnectAPI } from '@/helpers'
import {
  parseBlogByEntity,
  parseBlogEnity,
  parseLinkEntity,
} from '@/helpers/parseGQL'
import { useSWRFetch } from '@/helpers/swr'
import {
  docBlogs,
  docHomeBlogBy,
  docHomeHotBanner,
  docHomeHotBlogs,
} from '@/services/graphql-query'
import { useServerBlogList } from '@/services/hooks/hookBlog'
import {
  useHomeBlogBy,
  useHomeHotBanner,
  useHomeHotBlogs,
  useServerHomeBlogBy,
  useServerHomeHotBanner,
  useServerHomeHotBlogs,
  useServerHomeSEO,
} from '@/services/hooks/hookHome'

import { unstable_serialize } from 'swr'

//
export const UseHomeSEO = async () => {
  const { fetch } = useServerHomeSEO()

  const isAccept = isConnectAPI()

  if (!isAccept) return {}

  const data = await fetch()

  return data
}

//
export const UseFallbackHomeHotBlog = async () => {
  const { fetch } = useServerHomeHotBlogs()

  const isAccept = isConnectAPI()
  if (!isAccept) return {}

  const data = await fetch()

  return { [unstable_serialize([docHomeHotBlogs, {}])]: data }
}

//
export const useFetchHomeHotBlog = () => {
  const isAccept = isConnectAPI()

  const { fetch } = useHomeHotBlogs()

  var { data, isLoading } = useSWRFetch(
    isAccept ? docHomeHotBlogs : null,
    {},
    isAccept ? fetch : () => {},
  )

  if (data?.pageHome?.data?.attributes?.hot_blogs?.data) {
    data = data?.pageHome?.data?.attributes?.hot_blogs?.data?.map((item) =>
      parseBlogEnity(item),
    )
  }

  return { isLoading, data }
}

//
export const UseFallbackHomeHotBanner = async () => {
  const { fetch } = useServerHomeHotBanner()

  const isAccept = isConnectAPI()

  if (!isAccept) return

  const data = await fetch()

  return { [unstable_serialize([docHomeHotBanner, {}])]: data }
}

//
export const useFetchHomeHotBanner = () => {
  const { fetch } = useHomeHotBanner()

  const isAccept = isConnectAPI()

  var { data, isLoading } = useSWRFetch(
    isAccept ? docHomeHotBanner : null,
    {},
    isAccept ? fetch : () => {},
  )

  if (data?.pageHome?.data?.attributes?.hot_banner) {
    data = parseLinkEntity(data?.pageHome?.data?.attributes?.hot_banner)
  }

  return { isLoading, data }
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
  const { fetch } = useHomeBlogBy()

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
