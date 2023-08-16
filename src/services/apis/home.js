import { grapTransport } from '@/helpers/grapql'
import {
  docHomeBlogBy,
  docHomeHotBanner,
  docHomeHotBlogs,
} from '@/services/graphql-query/home'

const { get } = grapTransport()

export const homeHotBlog = async (body) => {
  return await get(docHomeHotBlogs, body)
}

export const homeHotBanner = async (body) => {
  return await get(docHomeHotBanner, body)
}

export const homeBlogBy = async (body) => {
  return await get(docHomeBlogBy, body)
}
