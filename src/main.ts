import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VuetifyOption from './config/VuetifyOption';
import store from '@/store/store';
Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
