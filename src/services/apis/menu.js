import { grapTransport } from '@/helpers/grapql'
import { docMenu } from '@/services/graphql-query/menu'

const { get } = grapTransport()

export const menuList = async (body) => {
  return await get(docMenu, body)
}
