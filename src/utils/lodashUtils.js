/**
@params lodash 字符串处理 工具
*/
import _ from 'lodash'
// 小驼峰
export function camelCase() {
  return _.camelCase(...arguments)
}
// 小写转大写
export function toUpper() {
  return _.toUpper(...arguments)
}
// 防抖
export function debounce() {
  return _.debounce(...arguments)
}
// 节流
export function throttle() {
  return _.throttle(...arguments)
}

export default {
  camelCase,
  toUpper,
  debounce,
  throttle
}
