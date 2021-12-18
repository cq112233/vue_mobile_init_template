
import Vue from 'vue'
import { getLocalStore, setLocalStore } from '@/utils/localStoreUtils'
import { changeTheme, isPc } from '@/utils/appUtils'
import config from '~/app.config'
export const SET_VERSION = 'SET_VERSION' // 设置app版本号
export const SET_LANG = 'SET_LANG' // 设置app版本号
export const SET_THEME = 'SET_THEME' // 设置app版本号
export default {
  // namespaced: true,
  state: {
    version: config.version, // 版本
    lang: getLocalStore('LANG') || 'en', // 语言
    theme: changeTheme(getLocalStore('THEME') || config.initThemeColor) || 'defualt', // 主题
    type: isPc() // 判断 pc or phone
  },
  mutations: {
    [SET_VERSION]: (state, payload) => {
      state.version = payload.version
    },
    [SET_LANG]: (state, payload) => {
      state.lang = payload.lang
    },
    [SET_THEME]: (state, payload) => {
      state.theme = payload.theme
    }
  },
  actions: {
    [SET_THEME]({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        // 操作dom
        if (state.theme !== payload) {
          changeTheme(payload)
          // 进入下个事件队列
          Vue.nextTick(() => {
            commit(SET_THEME, { theme: payload })
            setLocalStore('THEME', payload)
            resolve(`切换${payload}主题成功`)
          })
        } else {
          // reject('重复设置主题')
          // eslint-disable-next-line prefer-promise-reject-errors
          // reject('重复设置主题')
          // resolve('重复设置主题')
        }
      })
    }
  }
}
