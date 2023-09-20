import { blogDetail, blogList, blogRealtedList } from '@/services/apis/blog'
import { usePostAPI } from '@/services/hooks/hookAPI'
import { useServerPostAPI } from '@/services/hooks/hookServerAPI'

export const useBlogList = () => {
  const { loading, post: fetch } = usePostAPI(blogList)

  return { loading, fetch }
}

export const useServerBlogList = () => {
  const { post: fetch } = useServerPostAPI(blogList)

  return { fetch }
}

//
export const useBlogDetail = () => {
  const { loading, post: fetch } = usePostAPI(blogDetail)

  return { loading, fetch }
}

export const useServerBlogDetail = () => {
  const { post: fetch } = useServerPostAPI(blogDetail)

  return { fetch }
}

//

export const useBlogRelatedList = () => {
  const { loading, post: fetch } = usePostAPI(blogRealtedList)

  return { loading, fetch }
}

export const useServerBlogRelatedList = () => {
  const { post: fetch } = useServerPostAPI(blogRealtedList)

  return { fetch }
}
