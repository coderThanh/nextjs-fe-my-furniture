import { grapTransport } from '@/helpers/grapql'
import { docBlogDetail, docBlogs } from '@/services/graphql-query'

const { get } = grapTransport()

export const blogList = async (body) => {
  return await get(docBlogs, body)
}

export const blogDetail = async (body) => {
  return await get(docBlogDetail, body)
}
