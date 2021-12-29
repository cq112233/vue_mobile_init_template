
import Vue from 'vue'
import axios from 'axios'
import mockjs from 'mockjs'
// 自定义模拟数据格式
mockjs.mock(/\/mock\/test/, 'post', function() {
  return 'data'
})

Vue.prototype.$mock = () => {
  return axios.post('/mock/test')
}

