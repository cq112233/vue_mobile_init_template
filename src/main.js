import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { i18n } from './i18n' // 多语言
import 'normalize.css/normalize' // github移动端通用初始化样式
import 'lib-flexible' // 移动端适配
import './echarts' // 按需加载echart
import './assets/css/init' // 自定义初始化样式(配置通用样式)
import './env' // 环境变量设置,也可以在vue-cli自定义的.env.*文件配置  env需要后端配合跨域问题
import './permission' // 全局路由守卫
import './components/common' // 自动注册非项目全局组件
import './components/project' // 自动注册全局项目组件
import './vant'// 全局按需引入vant
import './theme/index' // 主题文件
import './directives' // 自定义指令集
import './filters' // 自定义过滤集
import './webSocket' // 自定义ws连接器
import './components/toast/index' // 自定义Toast
if (process.env.NODE_ENV !== 'production') {
// eslint-disable-next-line no-unused-expressions
  import('./mock') // mock 请求
  // eslint-disable-next-line no-unused-expressions
  import('./utils/eruda') // 开发环境,调试工具
} // 自定义过滤集

Vue.config.productionTip = false
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
