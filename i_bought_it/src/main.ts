import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import thema from './jsons/thema.json';
Vue.use(Vuetify, {thema});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
