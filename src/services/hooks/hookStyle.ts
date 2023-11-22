import { styleDetail } from '@/services/apis/style'
import { usePostAPI } from '@/services/hooks/hookAPI'

//
export const useStyleDetail = () => {
  const { loading, post: fetch } = usePostAPI(styleDetail)

  return { loading, fetch }
}
