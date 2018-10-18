import Vue from 'vue'
import Router from 'vue-router'
import LoginCallBackVue from '../components/login/loginCallBack.vue'
import InsertPageVue from '../components/InsertPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'InsertPage',
      component: InsertPageVue
    },
    {
      path: '/whooing/callback/:random',
      name: '후잉콜백',
      component: LoginCallBackVue
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
