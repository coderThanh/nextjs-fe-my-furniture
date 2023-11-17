import { restTransportByFetchBrowser } from '@/helpers/api-by-fetch'
import { docBlogDetail, docBlogs } from '@/services/graphql-query'

const { getGrapQl } = restTransportByFetchBrowser()

export const blogList = async (body?: { [key: string]: any }) => {
  return await getGrapQl(docBlogs, body)
}

export const blogDetail = async (body?: { [key: string]: any }) => {
  return await getGrapQl(docBlogDetail, body)
}
