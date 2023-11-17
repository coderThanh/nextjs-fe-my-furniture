import { restTransportByFetchBrowser } from '@/helpers/api-by-fetch'
import { docsStyleDetail } from '@/services/graphql-query'

const { getGrapQl } = restTransportByFetchBrowser()

export const styleDetail = async (body?: { [key: string]: any }) => {
  return await getGrapQl(docsStyleDetail, body)
}
