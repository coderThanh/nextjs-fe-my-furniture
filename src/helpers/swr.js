import { LIMIT_FETCH } from '@/consts/const'
import useSWR, { unstable_serialize } from 'swr'

export const getOptionsQuery = (query, searchField = [], isMerge = false) => {
  const searchOption = {}

  const pagination = {}

  // limit
  searchOption.limit = LIMIT_FETCH

  searchField.map((field) => {
    if (query[field]) searchOption[field] = query[field]
  })

  if (query?.limit) {
    searchOption.limit = query.limit
  }

  // sort
  if (query?.orderField && query?.order) {
    searchOption.orderField = query.orderField
    searchOption.order = query.order
  }

  // pagination
  if (query?.skip) {
    pagination.skip = parseInt(query.skip)
  }

  if (isMerge) {
    return {
      ...searchOption,
      ...pagination,
    }
  }

  return {
    searchOption: searchOption,
    pagination: pagination,
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
