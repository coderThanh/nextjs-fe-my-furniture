import { restTransportByFetchBrowser } from '@/helpers/api-by-fetch'
import { docsFooteScript, docsFooterCopyRight } from '@/services/graphql-query'

const { getGrapQl } = restTransportByFetchBrowser()

export const footerCopyRight = async (body?: { [key: string]: any }) => {
  return await getGrapQl(docsFooterCopyRight, body)
}

export const footerScript = async (body?: { [key: string]: any }) => {
  return await getGrapQl(docsFooteScript, body)
}
