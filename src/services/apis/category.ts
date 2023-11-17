import { restTransportByFetchBrowser } from '@/helpers/api-by-fetch'
import { docsCategoryDetail } from '@/services/graphql-query'

const { getGrapQl } = restTransportByFetchBrowser()

export const categoryDetail = async (body?: { [key: string]: any }) => {
  return await getGrapQl(docsCategoryDetail, body)
}
