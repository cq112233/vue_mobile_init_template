import { toUpper } from './lodashUtils'
// 设置token
export const setLocalStore = (name = 'userInfo', token, type = 1) => {
  type === 1 ? localStorage.setItem(toUpper(name), token) : sessionStorage.setItem(toUpper(name), token)
}
// 获取token
export const getLocalStore = (name, type = 1) => {
  return type === 1 ? localStorage.getItem(toUpper(name)) : sessionStorage.setItem(toUpper(name))
}
// 清除token
export const removeLocalStore = (name = 'userInfo', token = '', type = 1) => {
  setLocalStore(toUpper(name), token, type)
}

export default {
  setLocalStore,
  getLocalStore,
  removeLocalStore
}
