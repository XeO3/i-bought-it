import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import store from "./store/store";
import VueAnalytics from "vue-analytics";
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
