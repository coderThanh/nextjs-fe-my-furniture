import { isConnectAPI } from '@/helpers'
import { StyleEntity, parseStyleyEnity } from '@/helpers/parseGQL'
import { useServerStyleDetail } from '@/services/hooks/hookStyle-sv'

export const UseServerFetchStyleDetail = async (slug) => {
  const { fetch } = useServerStyleDetail()

  const isAccept = isConnectAPI()

  if (!isAccept) return null

  const options = { slug: slug }

  const res = await fetch(options)

  var data: StyleEntity | null = null

  if (res?.data?.styles?.data?.length > 0) {
    data = parseStyleyEnity(res?.data?.styles?.data[0])
  }

  return data
}
