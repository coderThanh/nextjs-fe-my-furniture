import { TOKEN } from '@/consts/const'

// -------------------------Check login------------------------------------
export const isLogin = () => !!getItemLocalStorage(TOKEN)

// -----------------Get/set/remove item localstorage-----------------------
export const setItemLocalStorage = (key, value) =>
  typeof localStorage !== 'undefined' && key && value
    ? localStorage.setItem(key, JSON.stringify(value))
    : null

export const getItemLocalStorage = (key = null) =>
  typeof localStorage !== 'undefined' && key
    ? JSON.parse(localStorage.getItem(key))
    : null

export const removeItemLocalStorage = (key = null, options) => {
  if (typeof localStorage === 'undefined') {
    return false
  }
  const { removeAll } = options || { removeAll: false }

  if (removeAll) {
    // Xoa het item o localstorage
    localStorage.clear()
    return true
  }

  if (!key) {
    return false
  }

  localStorage.removeItem(key)
  return true
}

// ------------------------------------------------------------

// -----------------Get/set query params
/**
 * Lấy một param từ url
 * @param {*} name
 * @returns
 */
export const getQueryStringParameter = (name, url) => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(url || window.location.search)
    return urlParams.get(name)
  }
  return
}

/**
 * get height, width screen
 * @returns object
 */
export const getWindowDimensions = () => {
  if (typeof window === 'undefined') {
    return { clientHeight: 0, clientWidth: 0, width: 0, height: 0 }
  }
  const { innerWidth: width, innerHeight: height } = window
  return {
    width: width ? width : 0,
    height: height ? height : 0,
  }
}

/**
 *
 * @param message
 * @returns
 */
export const getSentenceFromCamelCase = (message) => {
  if (!message) {
    return
  }
  const pattern =
    /[^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$]/g
  const messages = message.match(pattern)
  let errorMessage = ''
  for (let i = 0; i < messages?.length; i++) {
    errorMessage +=
      messages[i] === messages[i].toUpperCase()
        ? ' ' + messages[i].toLowerCase()
        : messages[i]
  }
  return errorMessage.trim()
}

/**
 *
 * @param type
 * @returns
 */
export const getRegExp = (type) => {
  let regex = null
  switch (type) {
    case 'email':
      regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g
      break
    case 'password':
      regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      break
    default:
      break
  }
  return regex
}

/*
 * Check image
 * @param {*} url
 * @returns
 */
export const isImage = (url) =>
  url ? /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url) : false

/**
 *
 * @param number
 * @returns
 */
export const isValidationPhoneNumber = (number, location = 'vi') => {
  if (location === 'vi') {
    return /([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(number)
  }
  return false
}

/**
 *
 * @param birthday
 * @returns
 */
export const validateBirthday = (birthday) => {
  let result = false
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday)) {
    return result
  }
  const parts = birthday.split('-')
  const now = new Date()
  const year = parseInt(parts[0], 10)
  const currentYear = now.getFullYear()
  const month =
    parts[1][0] === '0' ? parseInt(parts[1][1], 10) : parseInt(parts[1], 10)
  const day =
    parts[2][0] === '0' ? parseInt(parts[2][1], 10) : parseInt(parts[2], 10)

  result = true

  if (year >= currentYear) {
    result = false
  }
  if (currentYear - year < 18 || currentYear - year > 80) {
    result = false
  }
  if (month < 1 || month > 12) {
    result = false
  }
  if (day < 1 || day > 31) {
    result = false
  }

  return result
}

export const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

export const formatVideoTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

export const formatCash = (str) => {
  if (typeof str !== 'number') {
    return
  }
  return str.toLocaleString('vi-VN', { style: 'currency', currency: 'đ' })
}

export const formatPercent = (price, sellPrice) => {
  if (typeof price !== 'number' && typeof sellPrice !== 'number') {
    return
  }
  return `- ${Math.round((1 - sellPrice / price) * 100)}%`
}

export const copyBoard = (value = null) => {
  if (!value) {
    return
  }
  navigator.clipboard.writeText(value)
}
