export const useServerGetList = (action) => {
  const get = async ({ searchOption, pagination }) => {
    // const startTime = new Date().getTime();

    try {
      let res = null
      res = await action({ ...searchOption, ...pagination })
      if (res) {
        return res
      }

      return null // useSWR require return null if error
    } catch (errorAPI) {
      handleError(errorAPI)
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
      const res = await action({
        id,
        ...options,
      })

      if (res) {
        return res
      }

      return null
    } catch (errorAPI) {
      handleError(errorAPI)
      return null
    }
  }

  return { get }
}

export const useServerPostAPI = (action) => {
  const post = async (body) => {
    try {
      const res = await action({
        ...body,
      })

      console.log(res)

      if (res) return res

      return null
    } catch (errorAPI) {
      handleError(errorAPI)
      return null
    }
  }

  return { post }
}

const handleError = (errors) => {
  if (Array.isArray(errors) && errors.length > 0) {
    console.log(errors[0])
  } else {
    console.log(new Error('Something went wrong'))
  }
}
