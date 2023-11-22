import { isConnectAPI } from '@/helpers'
import { parseCategoryEnity } from '@/helpers/parseGQL'
import { useServerCategoryDetail } from '@/services/hooks/hookCategory-sv'
import { use } from 'react'

export const UseServerFetchCategoryDetail = (slug: string) => {
  const { fetch } = useServerCategoryDetail()

  const isAccept = isConnectAPI()
  if (!isAccept) return null

  const options = { slug: slug }

  const res = use(fetch(options))

  var data = null

  if (res?.data?.categories?.data?.length > 0) {
    data = parseCategoryEnity(res?.data?.categories?.data[0])
  }

  return data
}
