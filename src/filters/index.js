
import { camelCase } from '@/utils/lodashUtils'
import Vue from 'vue'
// 过滤器
const filters = {
  // 注册方法
  install(Vue) {
    for (const key in this) {
      if (Object.hasOwnProperty.call(this, key)) {
        if (key !== 'install') {
          const element = this[key]
          Vue.filter(key, element)
        }
      }
    }
  },
  // 小驼峰
  camelCase(val) {
    return camelCase(val)
  }
}
Vue.use(filters)
export default filters
