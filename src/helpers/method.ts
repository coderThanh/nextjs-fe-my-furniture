import { LIMIT_FETCH } from '@/consts/const'
import { ReadonlyURLSearchParams } from 'next/navigation'

//
export const getMetaRobots: any = (isNofollow?: boolean) => {
  const isHidden = process.env.NEXT_PUBLIC_IS_HIDDEN_SEO == 'true' || isNofollow

  return { index: !isHidden, follow: !isHidden }
}

//

export const getOptionsQuery = (
  query: { [key: string]: any },
  searchField: any[] = [],
  isMerge = false,
) => {
  const searchOption: { [key: string]: any } = {}

  const pagination: { [key: string]: any } = {}

  const sort = ['createdAt:DESC']

  // limit
  pagination.limit = LIMIT_FETCH

  searchField.map((field) => {
    if (field == 'keyword' && query[field]) {
      searchOption['title'] = { contains: query[field] }
      return
    }

    if (field == 'categorySlug' && query[field]) {
      searchOption['categories'] = { slug: { eq: query[field] } }

      return
    }

    if (field == 'styleSlug' && query[field]) {
      searchOption['styles'] = { slug: { eq: query[field] } }

      return
    }

    if (field == 'tagSlug' && query[field]) {
      searchOption['tags'] = { slug: { eq: query[field] } }

      return
    }

    if (query[field]) searchOption[field] = { eq: query[field] }
  })

  // sort
  if (query?.orderField && query?.order) {
    sort.push(`${query.orderField}:${query.order}`)
  }

  // pagination
  if (query?.limit) {
    pagination.limit = query.limit
  }

  if (query?.skip) {
    pagination.start = parseInt(query.skip)
  }

  if (isMerge) {
    return {
      ...searchOption,
      ...pagination,
      ...sort,
    }
  }

  return {
    searchOption: searchOption,
    pagination: pagination,
    sort: sort,
  }
}

//
export const parseQueryOptions = (
  searchParams?: ReadonlyURLSearchParams | null,
): { [key: string]: any } => {
  const query: { [key: string]: any } = {}

  searchParams?.forEach((value, key) => {
    query[key] = value
  })

  return query
}

//
export function serializerQueryOptions(options: { [key: string]: any }) {
  const params = new URLSearchParams('')

  for (const key in options) {
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      const element = options[key]

      if (element) {
        params.append(key, element)
      }
    }
  }

  return params.toString()
}

//
export const formatIntToSumary = (n) => {
  if (typeof n !== 'number') return n
  if (n < 1e3) return n
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K'
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M'
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B'
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T'
}

//
export const formatPercent = (price, sellPrice) => {
  if (typeof price !== 'number' && typeof sellPrice !== 'number') {
    return
  }
  return `- ${Math.round((1 - sellPrice / price) * 100)}%`
}

//
export function removeObjectKeyEmpty(object: { [key: string]: any }) {
  var newObject = {}

  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      if (object[key]) {
        newObject[key] = object[key]
      }
    }
  }
  return newObject
}
