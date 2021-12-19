import router, { getKeepAliveRouterGenerator } from './router'
import store from './store'
import NProgress from 'nprogress'
import config from '~/app.config' // 路由白名单路径集
import { GENERATE_ROUTES, SET_KEEPALIVELIST, KeepAliveStatus } from '@/store/modules/permission'
import { SET_USERINFO_ACTION, LOGOUT } from '@/store/modules/user'
import 'nprogress/nprogress.css' // nprogress 进度条
import { Toast } from 'vant'
const { isOpenAsyncRoutes, routerWhiteLists, isNprogress } = config// 进度条样式
// 函数颗粒化 缓存数据

function setTitleGenertor() {
  const host = location.host
  return function(to) {
    // 一般 网站title  'xxx-网站名'
    document.title = `${to.meta.title}-${host}`
  }
}
const setTitle = setTitleGenertor()

NProgress.configure({
  showSpinner: false
}) // 不显示转圈
// 是否加载过动态路由
let isGetAsyncRoutes = false
export function resetIsGetAsyncRoutes() {
  isGetAsyncRoutes = false
}
router.beforeEach(async(to, from, next) => {
  if (isNprogress) NProgress.start()
  // 是否存在token 登入
  if (store.state.user.accessToken) {
    // debugger
    if (to.path === '/page/login') {
      next('/')
      if (isNprogress) NProgress.done()
    } else {
      if (store.state.user.roles && store.state.user.roles.length) {
        next()
      } else {
        try {
          // 判断是否开启动态路由
          if (!isOpenAsyncRoutes) {
            await store.dispatch(SET_USERINFO_ACTION)
            return next({ ...to })
          }
          // 动态路由加载过了 直接返回
          if (isGetAsyncRoutes) return next()
          // 获取用户数据
          await store.dispatch(SET_USERINFO_ACTION)
          // 获取动态路由 api
          if (isOpenAsyncRoutes) {
            // debugger
            // 拉取动态路由
            const accessedRouter = await store.dispatch(GENERATE_ROUTES, store.state.user.roles)
            store.dispatch(SET_KEEPALIVELIST, { routes: getKeepAliveRouterGenerator(accessedRouter), type: KeepAliveStatus.asyncPage })
            router.addRoutes(accessedRouter)
            isGetAsyncRoutes = true
            Toast.clear()
            next({ ...to })
          } else {
            Toast.clear()
            next({ ...to })
          }
        } catch (error) {
          isGetAsyncRoutes = false
          store.dispatch(LOGOUT)
          Toast.fail(error.message || 'has Error')
          next({
            path: `/page/login?redirect=${to.path}`
          })
        }
      }
    }
  } else {
    if (to.path === '/page/login') {
      next()
    } else {
      if (routerWhiteLists.indexOf(to.path) >= 0) {
        next()
      } else {
        next({
          path: `/page/login?redirect=${to.path}`
        })
      }
    }
  }
})
router.afterEach((to, from) => {
  // 设置title
  setTitle(to)
  if (isNprogress) NProgress.done()
})
