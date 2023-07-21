export const debounce = (func, waitFor = 300) => {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), waitFor)
  }
}
