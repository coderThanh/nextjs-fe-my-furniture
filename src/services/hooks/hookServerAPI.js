import useSWR, { unstable_serialize } from 'swr'

export const useServerGetList = (action) => {
  const get = async ({ searchOption, pagination }) => {
    // const startTime = new Date().getTime();

    try {
      let res = null
      res = await action({ ...searchOption, ...pagination })
      if (res?.data) {
        return res.data
      }

      handleError(res?.data?.errors)

      return null // useSWR require return null if error
    } catch (errorAPI) {
      console.log(errorAPI)
      return null
    } finally {
      // _addLoadingTime(startTime, setLoading)
    }
  }
  return { get }
}

export const useServerGetDetailById = (action) => {
  const get = async ({ id, options }) => {
    try {
      const { data, errors, statusCode } = await action({
        id,
        ...options,
      })

      if (statusCode === 200) {
        return data
      }

      handleError(errors)
      return null
    } catch (errorAPI) {
      console.log(errorAPI)
      return null
    }
  }

  return { get }
}

const handleError = (errors) => {
  if (Array.isArray(errors) && errors.length > 0) {
    console.log(errors[0])
  } else {
    console.log(new Error('Something went wrong'))
  }
}

export const fetcherGraphSQL = (key, options) => {
  return null
}
