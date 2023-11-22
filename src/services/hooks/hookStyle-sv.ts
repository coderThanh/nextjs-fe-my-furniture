import { styleDetail } from '@/services/apis/style'
import { useServerPostAPI } from '@/services/hooks/hookServerAPI'

export const useServerStyleDetail = () => {
  const { post: fetch } = useServerPostAPI(styleDetail)

  return { fetch }
}
