import { restTransport } from '@/utils/api'

const { get, post, put } = restTransport()

export const register = async (body) => {
  return await post('/auth/register', body)
}

export const resetPasswordGetEmail = async (body) => {
  return await get('/auth/reset-password', body)
}

export const updatePassword = async (body) => {
  return await put('/auth/reset-password', body)
}
