import Vue from 'vue';
import Router from 'vue-router';

import LoginCallBack from '@/views/LoginCallBack.vue';
import Layout from '@/views/layouts/Layout.vue';
import Header from '@/views/layouts/Header.vue';
import LeftNav from '@/views/layouts/navs/LeftNav.vue';
import Settings from '@/views/Settings.vue';
import { AuthModule, UserModule } from './store/store';

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
          component: () =>
            import(/* webpackChunkName: "Home" */ './views/Home.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () =>
            import(/* webpackChunkName: "About" */ './views/About.vue'),
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () =>
            import(/* webpackChunkName: "Dashboard" */ './views/DashBoard.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'input',
          name: 'input',
          components: {
            default: () =>
              import(/* webpackChunkName: "Input" */ './views/Input.vue'),
          },
          meta: { requiresAuth: true },
        },
        {
          path: 'settings',
          name: 'settings',
          component: () =>
            import(/* webpackChunkName: "Settings" */ './views/Settings.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'whooing/callback/:random',
          name: 'callback',
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

export default router;
