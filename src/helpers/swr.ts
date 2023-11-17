'use client'

import useSWR, { unstable_serialize } from 'swr'

export const useSWRFetch = (
  key: string | null,
  options: { [key: string]: any },
  action: Function,
  config = {},
) => {
  const { isLoading, data, error } = useSWR(
    unstable_serialize([key, options]),
    async () => {
      return await action(options)
    },
    { ...config },
  )

  return { isLoading, data, error }
}
