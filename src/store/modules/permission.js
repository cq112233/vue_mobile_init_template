// 动态权限路由
import asyncRoutes from '@/router/asyncRoutes'
import pageRoutes from '@/router/pageRoutes'
export const SET_ROUTERS = 'SET_ROUTERS'
export const GENERATE_ROUTES = 'GENERATE_ROUTES'
export const SET_KEEPALIVELIST = 'SET_KEEPALIVELIST'
export const RESETROUTER = 'RESETROUTER'
export class KeepAliveStatus {
  static layout = 1
  static page = 2
  static common = 3
  static asyncPage = 4
}
// 是否开启权限控制
const openAuthControll = true
/**
 * 判断路由是否加载
 * @param menus
 * @param route
 */
function hasPermission(permissionResources, route) {
  // debugger
  if (route.meta && route.meta.auth && openAuthControll) {
    // 权限控制
    return permissionResources.some(role => route.meta.auth.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合员工角色权限的路由表
 * @param routes
 * @param roles
 */

export function filterAsyncRouter(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const permission = {
  // namespaced: true,
  state: {
    routers: pageRoutes, // 所有页面管理
    addRouters: [], // 动态路由级
    keepAliveLayoutList: [], // layout页keepAlive
    keepAlivePageList: [], // page页keepAlive
    keepAliveCommonList: [], // 公共页keepAlive
    keepAliveAsyncRouteList: [] // 动态路由
  },
  mutations: {
    // 设置路由
    [SET_ROUTERS]: (state, routers) => {
      state.addRouters = routers
      state.routers = pageRoutes.concat(routers)
    },
    // 设置动态路由
    [SET_KEEPALIVELIST]: (state, routeObj) => {
      switch (routeObj.type) {
        case 1:
          state.keepAliveLayoutList = routeObj.routes
          break
        case 2:
          state.keepAlivePageList = routeObj.routes
          break
        case 3:
          state.keepAliveCommonList = routeObj.routes
          break
        case 4:
          state.keepAliveAsyncRouteList = routeObj.routes
          break
      }
    },
    // 重置路由
    [RESETROUTER]: (state) => {
      state.addRouters = []
      state.routers = []
    }
  },
  actions: {
    [GENERATE_ROUTES]({
      commit
    }, permissionResources) {
      return new Promise(resolve => {
        const accessedRouter = filterAsyncRouter(asyncRoutes, permissionResources)
        commit(SET_ROUTERS, accessedRouter)
        resolve(accessedRouter)
      })
    },
    [SET_KEEPALIVELIST]: ({
      commit
    }, routeObj) => {
      commit(SET_KEEPALIVELIST, routeObj)
    }
  }
}

export default permission
