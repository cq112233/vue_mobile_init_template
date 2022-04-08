import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { i18n } from './plugins/i18n' // 多语言
import LoadingComp from './loading'
import 'normalize.css/normalize' // github移动端通用初始化样式
import 'lib-flexible' // 移动端适配

import './styles' // 自定义初始化样式(配置通用样式)
import './env' // 环境变量设置,也可以在vue-cli自定义的.env.*文件配置  env需要后端配合跨域问题
import './permission' // 全局路由守卫
import './directives' // 自定义指令集
import './filters' // 自定义过滤集
// import './theme' // 主题文件
import './components/common' // 自动注册非项目全局组件
import './components/project' // 自动注册全局项目组件
import './components/toast/index' // 自定义Toast
import './plugins/echarts' // 按需加载echart
import './plugins/vant'// 全局按需引入vant
import './plugins/vueScroller'// 全局按需引入vant
import './plugins/bigJs'

// import './plugins/webSocket' // 自定义ws连接器
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  import('./plugins/mock') // mock 请求
  // eslint-disable-next-line
  import('./plugins/eruda') // 开发环境,调试工具
} // 自定义过滤集

Vue.config.productionTip = false

// Vue.component('async-example', function(resolve, reject) {
//   // 这个特殊的 require 语法告诉 webpack
//   // 自动将编译后的代码分割成不同的块，
//   // 这些块将通过 Ajax 请求自动下载。
//   return import('./async-example')
// // 实例化
// })
// function resolve(res) {
//   console.log(res, 1)
// }
// import('./async-example').then(resolve)

Vue.component('async-example', () => {
  return {
    component: import('./async-example'),
    delay: 0,
    loading: LoadingComp
  }
})

// 实例化
const vm = new Vue({
  router,
  store,
  i18n,
  data() {
    return {
      rootEventHub: new Vue() // 全局发布订阅模式   this.$root.rootEventHub.$on()
    }
  },
  render: h => {
    return h(App)
  }
}).$mount('#app')

console.log(vm)

setTimeout(() => {
  document.documentElement.style.setProperty('--cq-primary-color', 'red')
}, 3000)

// 防 watcher 队列
let flushing = false
let waiting = false
const x = []
function xFn() {
  flushing = true
  // 这里执行逻辑
  flushing = waiting = false
  return x
}
function tar(xx) {
  if (flushing) return
  x.push(xx)
  if (waiting) return
  waiting = true
  nextTick(xFn)
}

const y = []
function nextTick(fn) {
  y.push(() => { return fn() })
  setTimeout(() => {
    y.forEach((item) => {
      console.log(item())
    })
  }, 2000)
}
tar(1)
tar(2)
setTimeout(() => {
  tar(3)
}, 1000)
