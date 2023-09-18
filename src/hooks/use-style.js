import { isConnectAPI } from '@/helpers'
import { useServerStyleDetail } from '@/services/hooks'

export const UseFetchStyleDetail = async (slug) => {
  const { fetch } = useServerStyleDetail()

  const isAccept = isConnectAPI()
  if (!isAccept) return null

  const options = { slug: slug }

  const res = await fetch(options)

  if (res?.styles?.data?.length > 0) {
    return res?.styles?.data[0]
  }

  return null
}
