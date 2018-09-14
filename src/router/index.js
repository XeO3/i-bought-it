import Vue from 'vue'
import Router from 'vue-router'
import loginCallBack from '@/components/login/logincallback'
import InsertPageVue from '@/components/InsertPage.vue'

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
      component: loginCallBack
    },
    {
      path: '*',
      redirect: 'InsertPage'
    }
  ]
})
