import { blogDetail, blogList } from '@/services/apis/blog'
import { usePostAPI } from '@/services/hooks/hookAPI'

export const useBlogList = () => {
  const { loading, post: fetch } = usePostAPI(blogList)

  return { loading, fetch }
}

//
export const useBlogDetail = () => {
  const { loading, post: fetch } = usePostAPI(blogDetail)

  return { loading, fetch }
}
