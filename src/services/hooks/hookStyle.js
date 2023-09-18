import { styleDetail } from '@/services/apis/style'
import { usePostAPI, useServerPostAPI } from '@/services/hooks/'

//
export const useStyleDetail = () => {
  const { loading, post: fetch } = usePostAPI(styleDetail)

  return { loading, fetch }
}

export const useServerStyleDetail = () => {
  const { post: fetch } = useServerPostAPI(styleDetail)

  return { fetch }
}
