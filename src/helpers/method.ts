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
  searchField = [],
  isMerge = false,
) => {
  const searchOption: { [key: string]: any } = {}

  const pagination: { [key: string]: any } = {}

  const sort = ['createdAt:desc']

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
  searchParams: ReadonlyURLSearchParams,
): { [key: string]: any } => {
  const query: { [key: string]: any } = {}

  searchParams.forEach((value, key) => {
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
