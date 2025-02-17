import { TIME_OUT_API, TOKEN } from '@/consts/const'
import axios from 'axios'
import { getItemLocalStorage, removeItemLocalStorage } from '.'

export const isServer = () => {
  return typeof window === 'undefined'
}

const context = {}

export const restTransport = () => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST_API,
    timeout: TIME_OUT_API,
  })

  let fetchingToken = false

  const get = async (url, params = {}, config = {}) => {
    if (fetchingToken) {
      return undefined
    }
    return await client.get(url, { headers: { ...config }, params })
  }

  const post = async (url, data = undefined, config = {}) => {
    if (fetchingToken) {
      return undefined
    }
    return await client.post(url, data, config)
  }

  const put = async (url, data = undefined, config = {}) => {
    if (fetchingToken) {
      return undefined
    }
    return await client.put(url, data, { headers: { ...config } })
  }

  const _delete = async (url, data = undefined, config = {}) => {
    if (fetchingToken) {
      return undefined
    }
    return await client.delete(url, {
      data,
      headers: { ...config },
    })
  }

  const rootUrl = () => client.defaults.baseURL

  // const refreshToken = async (oError: AxiosError) => {
  //   try {
  //     // check whether refreshing token or not
  //     if (!fetchingToken) {
  //       fetchingToken = true

  //       // refresh token
  //       const { data } = await post('/api/v1/auth/refresh', '')
  //       // check if this is server or not. We don't wanna save response token on server.
  //       if (!isServer()) {
  //         localStorage.setItem('token', data.accessToken)
  //       }
  //     }
  //     return true
  //   } catch (error) {
  //     // on error go to login page
  //     if (!isServer() && !useRouter.asPath.includes('/login')) {
  //       useRouter.push('/login')
  //     }
  //     if (isServer()) {
  //       context.res.setHeader('location', '/login')
  //       context.res.statusCode = 302
  //       context.res.end()
  //     }
  //     return Promise.reject(oError)
  //   } finally {
  //     fetchingToken = false
  //   }
  // }

  // Yêu cầu đến server
  client.interceptors.request.use(
    (currentConfig) => {
      // currentConfig.headers['Accept-Language'] = 'vi'
      currentConfig.headers['Content-Type'] = 'application/json'
      // currentConfig.headers['Access-Control-Allow-Origin'] = '*'
      // currentConfig.headers.withCredentials = true

      const token = getItemLocalStorage(TOKEN)
      if (token) {
        currentConfig.headers.Authorization = `Bearer ${token}`
      }

      return currentConfig
    },
    (error) => {
      // Do something with request error
      console.log('interceptors request error=============', error)
      // return Promise.reject(error)
    },
  )

  // server phản hồi kết quả
  client.interceptors.response.use(
    (response) => {
      return response.data
    },
    async (error) => {
      // Log error to console before reject with status code differ than 200 and 400
      if (
        error.response?.status === 401 &&
        !error.response?.config?.url?.includes('auth/refresh') &&
        !error.response?.config?.url?.includes('signin')
      ) {
        // return refreshToken(error)
        // console.log(error.message)
        fetchingToken = true
        removeItemLocalStorage(null, { removeAll: true })
        // router.push('/')
      }
      return Promise.reject(error)
    },
  )

  return { get, _delete, post, put, rootUrl }
}
