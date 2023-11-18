import { blogDetail, blogList } from '@/services/apis/blog'
import { useServerPostAPI } from '@/services/hooks/hookServerAPI'

export const useServerBlogList = () => {
  const { post: fetch } = useServerPostAPI(blogList)

  return { fetch }
}

export const useServerBlogDetail = () => {
  const { post: fetch } = useServerPostAPI(blogDetail)

  return { fetch }
}
