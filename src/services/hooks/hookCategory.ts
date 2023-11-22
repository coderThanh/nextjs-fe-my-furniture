import { categoryDetail } from '@/services/apis/category'
import { usePostAPI } from '@/services/hooks/hookAPI'

//
export const useCategoryDetail = () => {
  const { loading, post: fetch } = usePostAPI(categoryDetail)

  return { loading, fetch }
}
