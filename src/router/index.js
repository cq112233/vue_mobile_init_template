import Vue from 'vue'
import VueRouter from 'vue-router'
import tabberRoutes from './tabberRoutes'
import pageRoutes from './pageRoutes'
import store from '@/store'
import { SET_KEEPALIVELIST, KeepAliveStatus } from '@/store/modules/permission'
import config from '~/app.config'

// 复写warn方法方便检查由于使用name跳转无法监控404的问题
const sourceWarn = window.console.warn
window.console.warn = function(...rest) {
  const args = Array.from(rest)
  if (args[0] && args[0].includes('Route with name') && args[0].includes('does not exist')) {
    console.log('预备跳转404')
    setTimeout(() => {
      router.push('/404')
    }, 0)
  }
  sourceWarn(...rest)
}
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// 去除路由重定向报错
Vue.use(VueRouter)

const commonRoutes = [
  {
    path: '',
    redirect: '/layout/home'
  },
  {
    path: '/page',
    redirect: '/layout/home'
  }
]
const routes404 = [
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404',
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "404" */ '../views/404/404.vue')
  },
  {
    path: '*',
    name: '404',
    redirect: '/404'
  }
]
let routes = [
  ...commonRoutes,
  ...tabberRoutes,
  ...pageRoutes
]
if (!config.isOpenAsyncRoutes) {
  routes = routes.concat(routes404)
}
// 收集keepAlive 路由
export function getKeepAliveRouterGenerator(Routes, keepAliveRoutes = []) {
  Routes.forEach(Route => {
    if (Route.meta && Route.meta.keepAlive) {
      if (Route.name) {
        keepAliveRoutes.push(Route.name)
      }
    }
    if (Route.children && Route.children.length) {
      getKeepAliveRouterGenerator(Route.children, keepAliveRoutes)
    }
  })
  return keepAliveRoutes
}
store.dispatch(SET_KEEPALIVELIST, { routes: getKeepAliveRouterGenerator(pageRoutes), type: KeepAliveStatus.page })
store.dispatch(SET_KEEPALIVELIST, { routes: getKeepAliveRouterGenerator(tabberRoutes), type: KeepAliveStatus.layout })
store.dispatch(SET_KEEPALIVELIST, { routes: getKeepAliveRouterGenerator(commonRoutes), type: KeepAliveStatus.common })

const createRouter = () => new VueRouter({
  mode: 'hash', // history,hash 模式  hash模式兼容性高
  base: process.env.BASE_URL, // 基础路径
  scrollBehavior: () => ({ y: 0 }),
  routes // 路由集
})

const router = createRouter()

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
export default router
