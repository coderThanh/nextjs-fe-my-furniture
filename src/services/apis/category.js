import { grapTransport } from '@/helpers/grapql'
import { docsCategoryDetail } from '@/services/graphql-query'

const { get } = grapTransport()

export const categoryDetail = async (body) => {
  return await get(docsCategoryDetail, body)
}
