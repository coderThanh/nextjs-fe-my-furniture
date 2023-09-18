import { grapTransport } from '@/helpers/grapql'
import { docsStyleDetail } from '@/services/graphql-query/style'

const { get } = grapTransport()

export const styleDetail = async (body) => {
  return await get(docsStyleDetail, body)
}
