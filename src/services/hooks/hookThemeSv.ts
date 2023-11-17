import { parseContentEditor } from '@/helpers/parseGQL'
import { footerCopyRight } from '@/services/apis/theme'
import { useServerPostAPI } from '@/services/hooks/hookServerAPI'
import { use } from 'react'

export const useServerFooterCopyright = () => {
  const { post: fetch } = useServerPostAPI(footerCopyRight)

  var data = use(fetch())

  if (data?.data?.theme?.data?.attributes?.footer_copyright?.length > 0) {
    data = parseContentEditor(
      data?.data?.theme?.data?.attributes?.footer_copyright,
    )
  } else {
    data = null
  }

  return { data }
}
