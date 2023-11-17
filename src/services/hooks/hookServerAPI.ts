// old code, base on BE can delete

export const useServerGetList = (action: Function) => {
  const get = async ({ searchOption, pagination }) => {
    // const startTime = new Date().getTime();

    try {
      let res = null
      res = await action({ ...searchOption, ...pagination })

      const json = await res.json()

      if (json) return json

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

export const useServerGetDetailById = (action: Function) => {
  const get = async ({ id, options }) => {
    try {
      const res = await action({
        id,
        ...options,
      })

      const json = await res.json()

      if (json) return json

      return null
    } catch (errorAPI) {
      handleError(errorAPI)
      return null
    }
  }

  return { get }
}

export const useServerPostAPI = (action: Function) => {
  const post = async (body?: { [key: string]: any }) => {
    try {
      const res = await action({
        ...body,
      })

      const json = await res.json()

      if (json) return json

      return null
    } catch (errorAPI) {
      handleError(errorAPI)
      return null
    }
  }

  return { post }
}

const handleError = (errors: any) => {
  if (Array.isArray(errors) && errors.length > 0) {
    console.log(errors[0])
  } else {
    console.log(new Error('Something went wrong'))
  }
}
