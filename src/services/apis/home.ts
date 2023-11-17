import { restTransportByFetchBrowser } from '@/helpers/api-by-fetch'
import {
  docHomeBlogBy,
  docHomeHotBanner,
  docHomeHotBlogs,
  docHomeSEO,
} from '@/services/graphql-query'

const { getGrapQl } = restTransportByFetchBrowser()

export const homeHotBlog = async (body?: { [key: string]: any }) => {
  return await getGrapQl(docHomeHotBlogs, body)
}

export const homeHotBanner = async (body?: { [key: string]: any }) => {
  return await getGrapQl(docHomeHotBanner, body)
}

export const homeBlogBy = async (body?: { [key: string]: any }) => {
  return await getGrapQl(docHomeBlogBy, body)
}

export const homeSEO = async (body?: { [key: string]: any }) => {
  return await getGrapQl(docHomeSEO, body)
}
