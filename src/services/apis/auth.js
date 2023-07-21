import { restTransport } from '@/utils/api'

const { get, post, put } = restTransport()

export const register = async (body) => {
  return await post('/auth/register', body)
}

export const login = async (body) => {
  return await post('/auth/login', body)
}

export const logout = async () => {
  return await post('/auth/logout')
}

export const loginConfirm = async (body) => {
  return await post('/auth/confirm-login', body)
}

export const forgotPassword = async (body) => {
  return await post('/auth/forgot-password', body)
}

export const resetPasswordGetEmail = async (body) => {
  return await get('/auth/reset-password', body)
}

export const updatePassword = async (body) => {
  return await put('/auth/reset-password', body)
}

export const activeUser = async (body) => {
  return await put('/auth/active', body)
}

export const loginSocials = async (body) => {
  return await post('/auth/login-socials', body)
}

export const loginFB = async (body) => {
  return await post('/auth/login-fb', body)
}
