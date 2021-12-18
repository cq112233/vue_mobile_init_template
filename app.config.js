/**
@params App通用配置
*/
export default {
  version: '1.0.0', // app 版本号
  routerWhiteLists: [
    '/layout/home',
    '/layout/user',
    '/layout/star',
    '/layout/buy',
    '/page/defaultPage',
    '/page/defaultLayout'
  ], // 未登入  路由白名单
  initThemeColor: 'red', // 初始化主题颜色  defualt red blue green orange
  isOpenAsyncRoutes: true, // 开启动态路由权限
  isShowKeFu: false, // 是否显示客服
  isNprogress: true, // 是否展示顶部进度条
  isBetterScroll: false // 是否开启布局页的betterScroll
}
