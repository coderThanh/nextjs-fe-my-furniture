import {
  docHomeBlogBy,
  docHomeHotBanner,
  docHomeHotBlogs,
} from '@/services/graphql-query'
import {
  useHomeBlogBy,
  useHomeHotBanner,
  useHomeHotBlogs,
  useServerHomeBlogBy,
  useServerHomeHotBanner,
  useServerHomeHotBlogs,
} from '@/services/hooks'
import { unstable_serialize } from 'swr'
import { useSWRFetch } from '@/helpers/swr'
import {
  parseBlogByEntity,
  parseBlogEnity,
  parseImgEnity,
} from '@/helpers/parseGQL'

//
export const UseFallbackHomeHotBlog = async () => {
  const { fetch } = useServerHomeHotBlogs()

  const data = await fetch()

  return { [unstable_serialize([docHomeHotBlogs, {}])]: data }
}

//
export const useFetchHomeHotBlog = () => {
  const isConnectAPI = process.env.NEXT_PUBLIC_HAS_API_DB_CONECT

  const { fetch } = useHomeHotBlogs()

  var { data, isLoading } = useSWRFetch(
    isConnectAPI ? docHomeHotBlogs : null,
    {},
    isConnectAPI ? fetch : () => {},
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

  const data = await fetch()

  return { [unstable_serialize([docHomeHotBanner, {}])]: data }
}

//
export const useFetchHomeHotBanner = () => {
  const { fetch } = useHomeHotBanner()

  const isConnectAPI = process.env.NEXT_PUBLIC_HAS_API_DB_CONECT

  var { data, isLoading } = useSWRFetch(
    isConnectAPI ? docHomeHotBanner : null,
    {},
    isConnectAPI ? fetch : () => {},
  )

  if (data?.pageHome?.data?.attributes?.hot_banner?.data)
    data = {
      ...parseImgEnity(data?.pageHome?.data?.attributes?.hot_banner?.data),
    }

  return { isLoading, data }
}

//
export const UseFallbackHomeBlogBy = async () => {
  const { fetch } = useServerHomeBlogBy()

  var data = await fetch()

  return { [unstable_serialize([docHomeBlogBy, {}])]: data }
}

export const useFetchHomeBlogBy = () => {
  const isConnectAPI = process.env.NEXT_PUBLIC_HAS_API_DB_CONECT
  const { fetch } = useHomeBlogBy()

  var { isLoading, data } = useSWRFetch(
    isConnectAPI ? docHomeBlogBy : null,
    {},
    isConnectAPI ? fetch : () => {},
  )

  if (data?.pageHome?.data?.attributes?.blog_by) {
    data = data?.pageHome?.data?.attributes?.blog_by.map((item) =>
      parseBlogByEntity(item),
    )
  }

  return { isLoading, data }
}
