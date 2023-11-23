import { useCallback, useState } from 'react'
import axios from 'axios'
import { notifyError, notifySuccess } from '@/helpers/toast'

const useUploadFile = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchFormData = useCallback(async (file) => {
    try {
      setLoading(true)
      setError(null)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'images')

      const {
        data: {
          data,
          message: { title = '' },
          statusCode,
        },
      } = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN_API}/files`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          // onUploadProgress: (data) => {
          //   //Set the progress value to show the progress bar
          //   console.log('onUploadProgress, data', data)

          //   setProgress(Math.round((100 * data.loaded) / data.total))
          // },
        },
      )

      if (statusCode === 200) {
        notifySuccess(title)
        return data
      }

      notifyError(title)

      return undefined
    } catch (errorAPI) {
      setError(errorAPI)
      return undefined
    } finally {
      setLoading(false)
    }
  }, [])
  return {
    loading,
    fetchFormData,
    error,
    setError,
  }
}

export { useUploadFile }
