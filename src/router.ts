import Vue from 'vue';
import Router from 'vue-router';

import LoginCallBack from '@/views/LoginCallBack.vue';
import Layout from '@/views/layouts/Layout.vue';
import Header from '@/views/layouts/Header.vue';
import LeftNav from '@/views/layouts/navs/LeftNav.vue';
import Settings from '@/views/Settings.vue';
import { AuthModule, UserModule, AppModule } from './store/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      components: {
        default: Layout,
        top: Header,
        left: LeftNav,
      },
      children: [
        {
          path: '',
          name: 'home',
          meta: { title: '이거샀어 for Whooing' },
          component: () =>
            import('./views/Home.vue'),
        },
        {
          path: 'about',
          name: 'about',
          meta: { title: '이거샀어?' },
          component: () =>
            import('./views/About.vue'),
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          meta: { title: '대시보드', requiresAuth: true },
          component: () =>
            import('./views/DashBoard.vue'),
        },
        {
          path: 'entries',
          name: 'entries',
          meta: { title: '거래내역', requiresAuth: true },
          component: () =>
            import('./views/Entries.vue'),
        },
        {
          path: 'input',
          name: 'input',
          meta: { title: '거래입력', requiresAuth: true },
          components: {
            default: () =>
              import('./views/Input.vue'),
          },
        },
        {
          path: 'settings',
          name: 'settings',
          meta: { title: '환경설정', requiresAuth: true },
          component: () =>
            import('./views/Settings.vue'),
        },
        {
          path: 'whooing/callback/:random',
          name: 'callback',
          props: true,
          meta: { title: '로그인중...' },
          component: LoginCallBack,
        },
      ],
    },
    { path: 'login', redirect: '/' },
    { path: 'pwa', redirect: '/' },
    { path: '*', redirect: '/' },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!UserModule.isLogin) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    }
  }
  next();
});

router.afterEach((to, from) => {
  AppModule.SET_HEADERTITLE(to.meta.title || '이거샀어!');
});

export default router;
