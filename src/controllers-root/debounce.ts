export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor = 300
) => {
  let timeout: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
};
