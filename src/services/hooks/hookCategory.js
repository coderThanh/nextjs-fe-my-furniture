import { categoryDetail } from '@/services/apis/category'
import { usePostAPI, useServerPostAPI } from '@/services/hooks/'

//
export const useCategoryDetail = () => {
  const { loading, post: fetch } = usePostAPI(categoryDetail)

  return { loading, fetch }
}

export const useServerCategoryDetail = () => {
  const { post: fetch } = useServerPostAPI(categoryDetail)

  return { fetch }
}
