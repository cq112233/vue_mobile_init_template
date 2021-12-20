/**
@params App通用配置
*/
const appConfig = {
  version: '1.0.0', // app 版本号
  routerWhiteLists: [
    '/layout/home',
    '/layout/user',
    '/layout/star',
    '/layout/buy',
    '/page/defaultPage',
    '/page/defaultLayout'
  ], // 未登入  路由白名单
  cdn: {
    // 开发环境
    development: {
      link: [],
      script: []
    },
    // 测试环境
    test: {
      link: [],
      script: []
    },
    // 生产环境
    production: {
      link: [],
      script: []
    },
    // 公共环境加载
    common: {
      link: [
        // "https://cdn.bootcss.com/font-awesome/5.13.0/css/all.css",
        // "https://cdn.jsdelivr.net/npm/vant@2.11/lib/index.css"
      ],
      script: [
        // "https://cdn.jsdelivr.net/npm/vue@2.6/dist/vue.js",
        // "https://cdn.jsdelivr.net/npm/vant@2.11/lib/vant.min.js",
        // "https://unpkg.com/axios/dist/axios.min.js",
        // "https://unpkg.com/vue-i18n/dist/vue-i18n.js",
        // "https://unpkg.com/@better-scroll/core@latest/dist/core.min.js"
      ]
    }
  }, // cdn资源目录   html自动cdn引入
  dll: [
    'vue',
    'vant',
    'axios',
    'vue-i18n'
  ], // 这里是需要缓存的模块和插件
  isOpenDll: false, // 是否开启dll 缓存  上面的dll 数组依赖这个开关 (npm run dll 也依赖这个开关)  true 一定要先执行一次 npm run dll 不然开发环境启动不起来
  initThemeColor: 'red', // 初始化主题颜色  defualt red blue green orange,
  isOpenAsyncRoutes: true, // 开启动态路由权限
  isShowKeFu: false, // 是否显示客服
  isNprogress: true, // 是否展示顶部进度条
  isBetterScroll: false // 是否开启布局页的betterScroll
}

module.exports = appConfig
