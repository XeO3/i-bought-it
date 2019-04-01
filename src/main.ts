import Vue from "vue";
import VueAnalytics from "vue-analytics";
import App from "./App.vue";
import "./plugins/vuetify";
import "./registerServiceWorker";
import router from "./router";
import store from "./store/store";
Vue.use(VueAnalytics, {
  id: "UA-134070425-1",
  router,
  debug: {
    sendHitTask: process.env.NODE_ENV === "production",
  },
  autoTracking: {
    transformQueryString: false,
    skipSamePath: true,
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
