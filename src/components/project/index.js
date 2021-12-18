import Vue from 'vue'
// require.context 是webpack的一个api
const req = require.context('./', false, /\.vue$/)
// 全局注册
req.keys().forEach(element => {
  let name = element.replace(/(\.\/)|(\.vue)/ig, '')
  name = req(element).default.name || name
  Vue.component(name, req(element).default)
})
