import request from '@/plugins/axios/request'

export const getAppVersion = (data) => {
  return request.get('/api/version', data)
}
export function getJson() {
  return new Promise((resolve, reject) => {
    request
      .get('/api/json.json')
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.log(err)
      })
  })
}
