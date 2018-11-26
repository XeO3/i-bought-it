import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Layout from './views/layouts/layout';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: () =>
            import(/* webpackChunkName: "about" */ './views/Home.vue'),
        },
        {
          path: '/about',
          name: 'about',
          component: () =>
            import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
      ],
    },
  ],
});
