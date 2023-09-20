import { grapTransport } from '@/helpers/grapql'
import {
  docBlogDetail,
  docBlogs,
  docBlogsRelated,
} from '@/services/graphql-query'

const { get } = grapTransport()

export const blogList = async (body) => {
  return await get(docBlogs, body)
}

export const blogRealtedList = async (body) => {
  return await get(docBlogsRelated, body)
}

export const blogDetail = async (body) => {
  return await get(docBlogDetail, body)
}
