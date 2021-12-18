import Page from '@/page'
const asyncRoutes = [{
  path: '/page',
  component: Page,
  meta: {
    title: 'page',
    keepAlive: true
  },
  children: [
    {
      path: 'asyncRouteExample',
      name: 'asyncRouteExample',
      meta: {
        title: '页面',
        keepAlive: true,
        auth: ['admin', 'employee']
      },
      component: () => import('@/views/asyncRouteExample/asyncRouteExample')
    },
    {
      path: 'asyncRouteExample1',
      name: 'asyncRouteExample1',
      meta: {
        title: '页面',
        keepAlive: true,
        auth: ['admin']
      },
      component: () => import('@/views/asyncRouteExample1/asyncRouteExample1')
    }

  ]
},
{
  path: '/404',
  name: '404',
  meta: {
    title: '404',
    keepAlive: true
  },
  component: () =>
    import(/* webpackChunkName: "404" */ '../views/404/404.vue')
},
{
  path: '*',
  name: '404',
  redirect: '/404'
}
]
export default asyncRoutes
