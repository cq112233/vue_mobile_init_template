import Layout from '@/layout'
import Home from '@/views/home/home.vue'
export default [
  // 有tabber页面
  {
    path: '/layout',
    meta: {
      title: 'index'
      // keepAlive: true
    },
    redirect: '/layout/index',
    // beforeEnter: (to, from, next) => {
    //   // 主要判断from.path
    //   next()
    // },
    component: Layout,
    children: [
      // 魔法注释勿删 ⬇️
      /** plop view layout router **/
      {
        path: 'buy',
        name: 'buy',
        meta: {
          title: 'buy',
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: "buy" */ '../views/buy/buy.vue')
      },
      {
        path: 'star',
        name: 'star',
        meta: {
          title: 'star',
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: "star" */ '../views/star/star.vue')
      },
      {
        path: 'user',
        name: 'user',
        meta: {
          title: '个人中心',
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: "user" */ '../views/user/user.vue')
      },
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页',
          keepAlive: true
        },
        component: Home
      }
    ]
  }
]
