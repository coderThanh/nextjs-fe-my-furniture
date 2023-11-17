import { isConnectAPI } from '@/helpers'
import { parseContentEditor } from '@/helpers/parseGQL'
import { useSWRFetch } from '@/helpers/swr'
import {
  docsFooteScript,
  docsFooterCopyRight,
} from '@/services/graphql-query/theme'
import {
  useFooterCopyright,
  useFooterScripts,
} from '@/services/hooks/hookTheme'

//
export const useFetchFooterCoypright = () => {
  const { fetch } = useFooterCopyright()

  const isAccept = isConnectAPI()

  var { data, isLoading } = useSWRFetch(
    isAccept ? docsFooterCopyRight : null,
    {},
    isAccept ? fetch : () => {},
  )

  if (data?.theme?.data?.attributes?.footer_copyright?.length > 0) {
    data = parseContentEditor(data?.theme?.data?.attributes?.footer_copyright)
  } else {
    data = null
  }

  return { isLoading, data }
}

//
export const useFetchFooterScripts = () => {
  const { fetch } = useFooterScripts()

  const isAccept = isConnectAPI()

  var { data, isLoading } = useSWRFetch(
    isAccept ? docsFooteScript : null,
    {},
    isAccept ? fetch : () => {},
  )

  data = data?.theme?.data?.attributes?.hook_footer

  return { isLoading, data }
}
