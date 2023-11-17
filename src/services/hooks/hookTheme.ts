import { isConnectAPI } from '@/helpers'
import { useSWRFetch } from '@/helpers/swr'
import { footerScript } from '@/services/apis/theme'
import { docsFooteScript } from '@/services/graphql-query'
import { usePostAPI } from '@/services/hooks/hookAPI'

export const useFooterScripts = () => {
  const { loading, post: fetch } = usePostAPI(footerScript)

  const isAccept = isConnectAPI()

  var { data, isLoading } = useSWRFetch(
    isAccept ? docsFooteScript : null,
    {},
    isAccept ? fetch : () => {},
  )

  data = data?.theme?.data?.attributes?.hook_footer

  return { isLoading, data }
}
