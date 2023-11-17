import { footerCopyRight, footerScript } from '@/services/apis/theme'
import { usePostAPI } from '@/services/hooks/hookAPI'

export const useFooterCopyright = () => {
  const { loading, post: fetch } = usePostAPI(footerCopyRight)

  return { loading, fetch }
}

export const useFooterScripts = () => {
  const { loading, post: fetch } = usePostAPI(footerScript)

  return { loading, fetch }
}
