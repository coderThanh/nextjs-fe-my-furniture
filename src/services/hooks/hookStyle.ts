import { styleDetail } from '@/services/apis/style'
import { usePostAPI } from '@/services/hooks/hookAPI'
import { useServerPostAPI } from '@/services/hooks/hookServerAPI'

//
export const useStyleDetail = () => {
  const { loading, post: fetch } = usePostAPI(styleDetail)

  return { loading, fetch }
}

export const useServerStyleDetail = () => {
  const { post: fetch } = useServerPostAPI(styleDetail)

  return { fetch }
}
