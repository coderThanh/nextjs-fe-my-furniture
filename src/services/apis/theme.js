import { grapTransport } from '@/helpers/grapql'
import {
  docsFooteScript,
  docsFooterCopyRight,
} from '@/services/graphql-query/theme'

const { get } = grapTransport()

export const footerCopyRight = async (body) => {
  return await get(docsFooterCopyRight, body)
}

export const footerScript = async (body) => {
  return await get(docsFooteScript, body)
}
