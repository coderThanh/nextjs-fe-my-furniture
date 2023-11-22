import { categoryDetail } from '@/services/apis/category'
import { useServerPostAPI } from '@/services/hooks/hookServerAPI'

export const useServerCategoryDetail = () => {
  const { post: fetch } = useServerPostAPI(categoryDetail)

  return { fetch }
}
