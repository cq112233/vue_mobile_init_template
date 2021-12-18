// 异步设置app版本号

import {
  getUserInfo,
  login
} from '@/apis/login'
import {
  setLocalStore,
  getLocalStore
} from '@/utils/localStoreUtils'
import { resetRouter } from '@/router'
import { RESETROUTER } from './permission'
export const SET_USERINFO_MUTATION = 'SET_USERINFO_MUTATION' // 设置app版本号
export const SET_USERINFO_ACTION = 'SET_USERINFO_ACTION' // 用户信息
export const SET_ACCESSTOKEN = 'SET_ACCESSTOKEN' // token
export const SET_ROLES = 'SET_ROLES' // roles
export const LOGOUT = 'LOGOUT' // 退出
export const LOGIN = 'LOGIN' // 登录
export default {
  // namespaced: true,
  state: {
    accessToken: getLocalStore('ACCESSTOKEN') || '', // 令牌
    roles: [], // 权限
    userInfo: JSON.parse(getLocalStore('USERINFO')) || {} // 路由
  },
  mutations: {
    [SET_USERINFO_MUTATION]: (state, payload) => {
      state.userInfo = payload
      setLocalStore('USERINFO', JSON.stringify(payload))
    },
    [SET_ACCESSTOKEN]: (state, payload) => {
      state.accessToken = payload
      setLocalStore('ACCESSTOKEN', payload)
    },
    [SET_ROLES]: (state, payload) => {
      state.roles = payload
      setLocalStore('ROLES', JSON.stringify(payload))
    }
  },
  actions: {
    [SET_USERINFO_ACTION]: ({
      commit
    }) => {
      return new Promise((resolve, reject) => {
        getUserInfo().then(
          res => {
            commit(SET_USERINFO_MUTATION, res)
            commit(SET_ROLES, res.roles)
            resolve(res)
          }
        )
      })
    },
    // 登录
    [LOGIN]: ({ commit }, options) => {
      return new Promise((resolve, reject) => {
        login(options).then(res => {
          commit(SET_ACCESSTOKEN, res.accessToken)
          resolve()
        })
      })
    },
    // 退出
    [LOGOUT]: ({
      commit,
      rootState
    }) => {
      return new Promise((resolve, reject) => {
        commit(SET_USERINFO_MUTATION, '')
        commit(SET_ACCESSTOKEN, '')
        commit(SET_ROLES, [])
        // 重置路由
        resetRouter()
        commit(RESETROUTER)
        resolve()
      })
    }
  }
}
