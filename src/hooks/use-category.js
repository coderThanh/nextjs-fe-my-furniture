import { docsCategoryDetail } from '@/services/graphql-query/category'
import { useServerCategoryDetail } from '@/services/hooks'

export const UseFetchCategoryDetail = async (slug) => {
  const { fetch } = useServerCategoryDetail()

  const isAccept = isConnectAPI()
  if (!isAccept) return {}

  const options = { slug: slug }

  const data = await fetch(options)

  return { [unstable_serialize([docsCategoryDetail, options])]: data }
}
