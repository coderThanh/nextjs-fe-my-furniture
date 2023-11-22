import { isConnectAPI } from '@/helpers'
import { parseStyleyEnity } from '@/helpers/parseGQL'
import { useServerStyleDetail } from '@/services/hooks/hookStyle-sv'
import { use } from 'react'

export const UseServerFetchStyleDetail = (slug) => {
  const { fetch } = useServerStyleDetail()

  const isAccept = isConnectAPI()

  if (!isAccept) return null

  const options = { slug: slug }

  const res = use(fetch(options))

  var data = null

  if (res?.data?.styles?.data?.length > 0) {
    data = parseStyleyEnity(res?.data?.styles?.data[0])
  }

  return data
}
