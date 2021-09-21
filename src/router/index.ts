import {
  createRouter,
  createWebHistory,
  Router
  // RouteRecordRaw
} from 'vue-router';

import Suggest from './modules/suggest';

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [...Suggest],
  // 切换页面后，返回顶部,
  scrollBehavior() {
    return { top: 0 };
  }
});

// // 权限检查
// function canUserAccess() {
//   return new Promise(resolve => {
//     return resolve(true);
//   });
// }

// router.beforeEach(async (to, from, next) => {
//   // 获取菜单、用户信息、调用store等异步操作

//   // 检查权限，true继续，false进入登录
//   const isAllow = await canUserAccess();
//   isAllow ? next() : next({ name: 'login' });
// });

export default router;
