import { categoryDetail } from '@/services/apis/category'
import { usePostAPI } from '@/services/hooks/hookAPI'
import { useServerPostAPI } from '@/services/hooks/hookServerAPI'

//
export const useCategoryDetail = () => {
  const { loading, post: fetch } = usePostAPI(categoryDetail)

  return { loading, fetch }
}

export const useServerCategoryDetail = () => {
  const { post: fetch } = useServerPostAPI(categoryDetail)

  return { fetch }
}
