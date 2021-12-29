import webSocket from './ws'
import Vue from 'vue'
// eslint-disable-next-line new-cap
const ws = {
  install(Vue) {
    Vue.prototype.$ws = webSocket.getInstance({
      url: 'ws://47.242.25.96:10000/websocket/quote?_=1607675853653&_s=d1e829d321b235cbc31a0539cd5a986d'
      // openHookFn: () => {
      //   console.log('ws开启钩子')
      // },
      // messageHookFn: () => {
      //   console.log('ws接受钩子')
      // },
      // closeHookFn: () => {
      //   console.log('ws关闭钩子')
      // },
      // errorHookFn: () => {
      //   console.log('ws错误钩子')
      // }
    }) // 全局自定义组件注册
  }
}

Vue.use(ws) // 全局注册websocket

export default ws
