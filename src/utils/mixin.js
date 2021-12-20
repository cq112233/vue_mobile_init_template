/**
@description mixin 配置
*/
import * as totalUtils from './index'
import themeColors from '@/assets/theme' // 自定义主题颜色
import { mapState } from 'vuex'
import axios from 'axios'
const customMixin = {
  // 防小程序钩子方法
  mounted() {
    this.$options.onReady && this.$options.onReady.call(this)
    this.$options.onLoad && this.$options.onLoad.call(this)
  },
  activated() {
    this.$options.onShow && this.$options.onShow.call(this)
  },
  deactivated() {
    this.$options.onHide && this.$options.onHide.call(this)
  },
  destroyed() {
    this.$options.onUnload && this.$options.onUnload.call(this)
  },

  methods: {
    // 工具方法挂载vue实例中
    ...totalUtils,
    // 初始化数据时，数据之间没有联系的 , 并行加载, 提高页面加载速度
    axiosAll() {
      return axios.all(...arguments)
    },
    // 代理vueRouter
    routerPush() {
      this.$router.push(...arguments)
    },
    routerReplace() {
      this.$router.replace(...arguments)
    },
    routerGo() {
      this.$router.go(...arguments)
    },
    routerBack() {
      this.$router.back()
    },
    // 代理vueX
    commit() {
      this.$store.commit(...arguments)
    },
    dispatch() {
      this.$store.dispatch(...arguments)
    }
  },
  computed: {
    // 每个实例全局 状态
    ...mapState({
      app: (state) => state.app,
      user: (state) => state.user,
      permission: (state) => state.permission
    }),
    // 颜色集合
    themeColors() {
      return themeColors
    },
    // 主题色
    themeColor() {
      return this.themeColors[`${this.app.theme}Primary`]
    }
  }
}

// 全局注册
export const mixin = {
  install(Vue) {
    Vue.mixin(customMixin)
  }
}
// 按需注册
export default customMixin
