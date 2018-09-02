import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import loginCallBack from '@/components/login/logincallback'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/whooing/callback',
      name: '후잉콜백',
      component: loginCallBack
    }
  ]
})
