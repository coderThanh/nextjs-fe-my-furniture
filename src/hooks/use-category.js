import { isConnectAPI } from '@/helpers'
import { useServerCategoryDetail } from '@/services/hooks'

export const UseServerFetchCategoryDetail = async (slug) => {
  const { fetch } = useServerCategoryDetail()

  const isAccept = isConnectAPI()
  if (!isAccept) return null

  const options = { slug: slug }

  const res = await fetch(options)

  if (res?.categories?.data?.length > 0) {
    return res?.categories?.data[0]
  }

  return null
}
