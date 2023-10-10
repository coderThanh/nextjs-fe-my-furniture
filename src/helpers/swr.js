import { LIMIT_FETCH } from '@/consts/const'
import useSWR, { unstable_serialize } from 'swr'

export const getOptionsQuery = (query, searchField = [], isMerge = false) => {
  const searchOption = {}

  const pagination = {}

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

export const useSWRFetch = (key, options, action, config = {}) => {
  const { isLoading, data, error } = useSWR(
    unstable_serialize([key, options]),
    async () => {
      return await action(options)
    },
    { ...config },
  )

  return { isLoading, data, error }
}
