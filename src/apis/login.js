import { getLocalStore } from '@/utils'
// admin 登录
export function login({ roleId }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        accessToken: `i am token ${roleId}`
      })
    }, 1000)
  })
}

// admin 登录
export function getUserInfo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userInfo = {
        username: 'zhangsan',
        age: 18,
        roles: getLocalStore('accessToken').includes('1') ? ['admin'] : ['employee']
      }
      resolve(userInfo)
    }, 200)
  })
}
