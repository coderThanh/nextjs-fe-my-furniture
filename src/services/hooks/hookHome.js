import {
  homeBlogBy,
  homeHotBanner,
  homeHotBlog,
  homeSEO,
} from '@/services/apis/home'
import { usePostAPI } from '@/services/hooks/hookAPI'
import { useServerPostAPI } from '@/services/hooks/hookServerAPI'

export const useHomeHotBlogs = () => {
  const { loading, post: fetch } = usePostAPI(homeHotBlog)

  return { loading, fetch }
}

export const useServerHomeHotBlogs = () => {
  const { post: fetch } = useServerPostAPI(homeHotBlog)

  return { fetch }
}

//
export const useHomeHotBanner = () => {
  const { loading, post: fetch } = usePostAPI(homeHotBanner)

  return { loading, fetch }
}

export const useServerHomeHotBanner = () => {
  const { post: fetch } = useServerPostAPI(homeHotBanner)

  return { fetch }
}

//
export const useHomeBlogBy = () => {
  const { loading, post: fetch } = usePostAPI(homeBlogBy)

  return { loading, fetch }
}

export const useServerHomeBlogBy = () => {
  const { post: fetch } = useServerPostAPI(homeBlogBy)

  return { fetch }
}

//
export const useHomeSEO = () => {
  const { loading, post: fetch } = usePostAPI(homeSEO)

  return { loading, fetch }
}

export const useServerHomeSEO = () => {
  const { post: fetch } = useServerPostAPI(homeSEO)

  return { fetch }
}
