import { RouteRecordRaw } from 'vue-router';

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param meta.title 导航名称
 * @param meta.keepAlive 缓存该路由
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/suggest/index',
    name: 'suggest-index',
    meta: {
      title: '意见反馈'
    },
    component: () => import('@/views/suggest/index.vue')
  }
  // {
  //   path: '/suggest/result',
  //   name: 'suggest-result',
  //   meta: {
  //     title: '意见反馈'
  //   },
  //   component: () => import('@/views/suggest/result.vue')
  // }
];

export default routes;
