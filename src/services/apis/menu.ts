import { restTransportByFetchBrowser } from '@/helpers/api-by-fetch'
import { docMenu } from '@/services/graphql-query'

const { getGrapQl } = restTransportByFetchBrowser()

export const menuList = async (body?: { [key: string]: any }) => {
  return await getGrapQl(docMenu, body)
}
