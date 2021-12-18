import { setStyle } from '@/utils/domUtils'
import store from '@/store'
import Vue from 'vue'
// 自定义指令
const directives = {
  // 注册方法
  install(Vue) {
    for (const key in this) {
      if (Object.hasOwnProperty.call(this, key)) {
        if (key !== 'install') {
          const element = this[key]
          Vue.directive(key, element)
        }
      }
    }
  },
  // 返回顶部指令
  scrollToTop(el, binding) {
    el.onclick = function pageScroll() {
      if (document.documentElement.scrollTop > 0) {
        const timer = setInterval(() => {
          if (document.documentElement.scrollTop <= 0) {
            clearInterval(timer)
            document.documentElement.scrollTop = 0
            return
          }
          document.documentElement.scrollTop -= ((binding.value && binding.value.distance) || 10)
        }, ((binding.value && binding.value.speed) || 1))
      }
    }
  },
  // 拖拽指令
  drag(el, dirObj, newVnode, oldVnode) {
    setStyle(el, {
      position: 'fixed',
      zIndex: 1,
      cursor: 'pointer'
    })
    // 判断PC 还是 手机端
    var type = store.getters.app.type
    el.ontouchstart = function(e) {
      const diffX = type ? e.clientX - el.offsetLeft : e.touches[0].clientX - el.offsetLeft
      const diffY = type ? e.clientY - el.offsetTop : e.touches[0].clientY - el.offsetTop
      document.ontouchmove = document.onmousemove = (event) => {
        const left = type ? (event.clientX - diffX) + 'px' : (event.touches[0].clientX - diffX) + 'px'
        const top = type ? (event.clientY - diffY) + 'px' : (event.touches[0].clientY - diffY) + 'px'
        setStyle(el, {
          left,
          top,
          cursor: 'move'
        })
      }
      document.ontouchend = document.onmouseup = () => {
        document.ontouchend = document.onmouseup = document.ontouchmove = document.onmousemove = null
        setStyle(el, {
          cursor: 'pointer'
        })
      }
    }
    if (type) {
      el.onmousedown = el.ontouchstart
    }
  }
}

Vue.use(directives) // 全局注册指令集
export default directives
