import {
  homeBlogBy,
  homeHotBanner,
  homeHotBlog,
  homeSEO,
} from '@/services/apis/home'
import { useServerPostAPI } from '@/services/hooks/hookServerAPI'

export const useServerHomeHotBlogs = () => {
  const { post: fetch } = useServerPostAPI(homeHotBlog)

  return { fetch }
}

export const useServerHomeHotBanner = () => {
  const { post: fetch } = useServerPostAPI(homeHotBanner)

  return { fetch }
}

export const useServerHomeBlogBy = () => {
  const { post: fetch } = useServerPostAPI(homeBlogBy)

  return { fetch }
}

export const useServerHomeSEO = () => {
  const { post: fetch } = useServerPostAPI(homeSEO)

  return { fetch }
}
