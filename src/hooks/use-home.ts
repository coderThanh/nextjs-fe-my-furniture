import { LIMIT_FETCH } from '@/consts/const'
import { isConnectAPI } from '@/helpers'
import {
  parseBlogByEntity,
  parseBlogEnity,
  parseLinkEntity,
  parseQueryBlogList,
  parseSEO,
} from '@/helpers/parseGQL'
import { useServerBlogList } from '@/services/hooks/hookBlog-sv'

import {
  useServerHomeBlogBy,
  useServerHomeHotBanner,
  useServerHomeHotBlogs,
  useServerHomeSEO,
} from '@/services/hooks/hookHome-sv'

import { use } from 'react'

//
export const UseHomeSEO = async () => {
  const { fetch } = useServerHomeSEO()

  const isAccept = isConnectAPI()

  if (!isAccept) return {}

  var res = await fetch()

  if (res?.data?.pageHome?.data?.attributes?.seo) {
    res = parseSEO(res?.data?.pageHome?.data?.attributes?.seo)
  }

  return res ?? null
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

  return res
}

//
export const useFetchServerHomeBlogBy = () => {
  const { fetch } = useServerHomeBlogBy()

  var res = use(fetch())

  if (res?.data?.pageHome?.data?.attributes?.blog_by) {
    res = res?.data?.pageHome?.data?.attributes?.blog_by.map((item) =>
      parseBlogByEntity(item),
    )
  }

  return res
}

//
export const UseFetchServerHomeBlogs = () => {
  const { fetch } = useServerBlogList()

  const options = {
    pagination: {
      limit: LIMIT_FETCH,
      start: 0,
    },
    sort: ['createdAt:desc'],
  }

  const res = use(fetch(options))

  var data: any = {}

  if (res?.data?.blogs?.data?.length > 0) {
    data = parseQueryBlogList(
      res?.data?.blogs?.data,
      res?.data?.blogs?.meta?.pagination,
    )
  }

  return data
}
