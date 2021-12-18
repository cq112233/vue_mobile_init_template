import toast from './index.vue'
import Vue from 'vue'
export function Toast(option = { message: '加载中' }) {
  const { message } = option
  const ToastConstructor = Vue.extend(toast)
  const toastInstance = new ToastConstructor()
  const cqToast = toastInstance.$mount(document.createElement('div'))
  document.body.appendChild(cqToast.$el)
  cqToast.success(message)
}
const customToast = {
  install(Vue) {
    const ToastConstructor = Vue.extend(toast)
    const toastInstance = new ToastConstructor()
    const cqToast = toastInstance.$mount(document.createElement('div'))
    document.body.appendChild(cqToast.$el)
    Vue.prototype.$cqToast = cqToast
  }
}

Vue.use(customToast) // 全局注册自定义提示
export default customToast
