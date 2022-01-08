import qs from 'qs'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import {
  Dialog, Toast
} from 'vant'
let isRfreshing = false
let requests = []
const instance = axios.create({
  baseURL: process.env.baseURL,
  timeout: 6000 // 最多6秒
})
function redirectLogin() {
  router.push({
    path: '/page/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
// 刷新token
function refreshToken() {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: { refreshtoken: store.state.user.userInfo.refresh_token }
  })
}

// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    // if (config.method === 'post') {
    //   config.data = qs.stringify(config.data)
    // }
    // config.headers.authorization = localStorage.token
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    if (response.code === 10000) {
      Dialog.alert({
        title: '错误代码',
        message: '帐户信息过期，请重新登录'
      }).then(() => {
        // store.dispatch('USER_SIGNOUT').then(() => {
        //   location.href = `${website.baseURL}/public/index.html?clearAll=1`
        // })
      })
    }
    return response
  },
  function(error) {
    // console.log('请求响应失败了 => ', error)
  // 如果是使用的 HTTP 状态码，错误处理就写到这里
  // console.dir(error)
    if (error.response) { // 请求发出去收到响应了，但是状态码超出了 2xx 范围
      const { status } = error.response
      if (status === 400) {
        Toast.fail('请求参数错误')
      } else if (status === 401) {
        // ====== 无痛刷新token=====
        // token 无效（没有提供 token、token 是无效的、token 过期了）
        // 如果有 refresh_token 则尝试使用 refresh_token 获取新的 access_token
        if (!store.state.user.userInfo) {
          redirectLogin()
          return Promise.reject(error)
        }
        // 刷新 token
        if (!isRfreshing) {
          isRfreshing = true // 开启刷新状态
          // 尝试刷新获取新的 token
          return refreshToken().then(res => {
            if (!res.data.success) {
              throw new Error('刷新 Token 失败')
            }
            // 刷新 token 成功了
            store.commit('setUser', res.data.content)
            // 把 requests 队列中的请求重新发出去
            requests.forEach(cb => cb())
            // 重置 requests 数组
            requests = []
            return instance(error.config)
          }).catch(err => {
            console.log(err)
            Toast.fail('登录已过期，请重新登录')
            store.commit('setUser', null)
            redirectLogin()
            return Promise.reject(error)
          }).finally(() => {
            isRfreshing = false // 重置刷新状态
          })
        }

        // 刷新状态下，把请求挂起放到 requests 数组中
        return new Promise(resolve => {
          requests.push(() => {
            resolve(instance(error.config))
          })
        })
      } else if (status === 403) {
        Toast.error('没有权限，请联系管理员')
      } else if (status === 404) {
        Toast.error('请求资源不存在')
      } else if (status >= 500) {
        Toast.error('服务端错误，请联系管理员')
      }
    } else if (error.request) { // 请求发出去没有收到响应
      Toast.error('请求超时，请刷新重试')
    } else { // 在设置请求时发生了一些事情，触发了一个错误
      Toast.error(`请求失败：${error.message}`)
    }

    // 把请求失败的错误对象继续抛出，扔给上一个调用者
    return Promise.reject(error)
  }
)

export default instance
