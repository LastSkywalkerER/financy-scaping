export const addToStorage = (key: string, data: any): void => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const removeFromStorage = (key: string): void => {
  localStorage.removeItem(key)
}

export const getFromStorage = (key: string) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) || '') : undefined
}
