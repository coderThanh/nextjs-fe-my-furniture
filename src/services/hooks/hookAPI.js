import { notifyError, notifySuccess } from '@/helpers/toast'
import { useCallback, useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

const usePostAPI = (action) => {
  const { executeRecaptcha } = useGoogleReCaptcha()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const post = useCallback(
    async (body) => {
      try {
        setLoading(true)
        setError(null)

        let gRecaptchaToken = undefined

        if (body?.isRecaptcha === true) {
          if (!executeRecaptcha) {
            notifyError('Lỗi không có ReCaptcha')
            return
          }

          gRecaptchaToken = await executeRecaptcha('enquiryFormSubmit')
        }

        delete body?.isRecaptcha

        const { data, errors, message, statusCode } = await action({
          ...body,
          gRecaptchaToken,
        })

        if (statusCode === 200) {
          if (message?.content) {
            notifySuccess(message?.content)
          }
          return data
        }

        notifyError(message?.content)
        handleError(errors, setError)
        return undefined
      } catch (errorAPI) {
        setError(errorAPI)
        return undefined
      } finally {
        setLoading(false)
      }
    },
    [action, executeRecaptcha],
  )
  return {
    loading,
    post,
    error,
    setError,
  }
}

const useGetDetailById = (action) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const get = useCallback(
    async ({ id, options }) => {
      try {
        setLoading(true)
        setError(null)

        const { data, errors, message, statusCode } = await action({
          id,
          ...options,
        })

        if (statusCode === 200) {
          return data
        }

        notifyError(message?.content)

        handleError(errors, setError)
        return undefined
      } catch (errorAPI) {
        setError(errorAPI)
        return undefined
      } finally {
        setLoading(false)
      }
    },
    [action],
  )

  return { loading, get, error, setError }
}

const useGetList = (action) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const get = useCallback(
    async ({ searchOption, pagination }) => {
      const startTime = new Date().getTime()
      try {
        setLoading(true)
        setError(null)
        let res = null
        res = await action({ ...searchOption, ...pagination })
        if (res?.data) {
          return res.data
        }
        handleError(res?.data?.errors, setError)
        return undefined
      } catch (errorAPI) {
        setError(errorAPI)
        return undefined
      } finally {
        // _addLoadingTime(startTime, setLoading)
      }
    },
    [action],
  )
  return { loading, get, error, setError }
}

const usePutAPIById = (action) => {
  const { executeRecaptcha } = useGoogleReCaptcha()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const put = useCallback(
    async (param) => {
      try {
        setLoading(true)
        setError(null)

        let gRecaptchaToken = undefined

        if (param?.isRecaptcha === true) {
          if (!executeRecaptcha) {
            notifyError('Lỗi không có ReCaptcha')
            return
          }

          gRecaptchaToken = await executeRecaptcha('enquiryFormSubmit')
        }

        delete param?.isRecaptcha

        const { data, errors, message, statusCode } = await action({
          ...param,
          gRecaptchaToken,
        })

        if (statusCode === 200) {
          notifySuccess(message?.content)
          return data
        }

        notifyError(message?.content)

        handleError(errors, setError)
        return undefined
      } catch (errorAPI) {
        setError(errorAPI)
        return undefined
      } finally {
        setLoading(false)
      }
    },
    [action, executeRecaptcha],
  )
  return {
    loading,
    put,
    error,
    setError,
  }
}

const handleError = (errors, setError) => {
  if (Array.isArray(errors) && errors.length > 0) {
    setError(errors[0])
  } else {
    setError(new Error('Something went wrong'))
  }
}

const _addLoadingTime = (startTime, setLoading) => {
  const loadingTime = new Date().getTime() - startTime
  const countDownTime = loadingTime > 200 ? loadingTime : 200
  const timing = setTimeout(() => {
    setLoading(false)
    clearTimeout(timing)
  }, countDownTime)
}

export { useGetDetailById, useGetList, usePostAPI, usePutAPIById }
