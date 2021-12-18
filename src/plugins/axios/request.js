import qs from 'qs'
import axios from 'axios'
import {
  Dialog
} from 'vant'
const instance = axios.create({
  baseURL: process.env.baseURL,
  timeout: 6000 // 最多6秒
})

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
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance
