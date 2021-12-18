
// 环境变量控制
if (process.env.NODE_ENV === 'development') {
  process.env.baseUrl = '/'
} else if (process.env.NODE_ENV === 'test') {
  process.env.baseUrl = '/'
} else if (process.env.NODE_ENV === 'production') {
  process.env.baseUrl = '/'
}
