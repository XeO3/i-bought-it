import Vue from 'vue';
import Router from 'vue-router';
import Layout from './views/layouts/Layout';
import Header from './views/layouts/Header';
import LeftNav from './views/layouts/navs/LeftNav';

Vue.use(Router);

export default new Router({
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
            import(/* webpackChunkName: "about" */ './views/Home.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () =>
            import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
      ],
    },
  ],
});
