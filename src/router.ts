import Vue from "vue";
import Router from "vue-router";

import AboutVue from "@/views/About.vue";
import DashBoardVue from "@/views/DashBoard.vue";
import EntriesVue from "@/views/Entries.vue";
import HomeVue from "@/views/Home.vue";
import InputVue from "@/views/Input.vue";
import Header from "@/views/layouts/Header.vue";
import Layout from "@/views/layouts/Layout.vue";
import LeftNav from "@/views/layouts/navs/LeftNav.vue";
import LoginCallBack from "@/views/LoginCallBack.vue";
import Settings from "@/views/Settings.vue";
import { AppModule, AuthModule, UserModule } from "./store/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      components: {
        default: Layout,
        top: Header,
        left: LeftNav,
      },
      children: [
        {
          path: "",
          name: "index",
          component: HomeVue,
          beforeEnter: (to, from, next) => {
            if (UserModule.isLogin) {
              next({ name: "dashboard" });
            }
            next();
          },
        },
        {
          path: "home",
          name: "home",
          meta: { title: "이거샀어 for Whooing" },
          component: HomeVue,
        },
        {
          path: "about",
          name: "about",
          meta: { title: "이거샀어?" },
          component: AboutVue,
        },
        {
          path: "dashboard",
          name: "dashboard",
          meta: { title: "대시보드", requiresAuth: true },
          component: DashBoardVue,
        },
        {
          path: "entries",
          name: "entries",
          meta: { title: "거래내역", requiresAuth: true },
          component: EntriesVue,
        },
        {
          path: "checkDuplication",
          name: "checkDuplication",
          meta: { title: "중복거래검색", requiresAuth: true },
          component: () =>
            import(
              /* webpackChunkName: "checkDuplication" */ "./views/CheckDuplication.vue",
            ),
        },
        {
          path: "input",
          name: "input",
          meta: { title: "거래입력", requiresAuth: true },
          component: InputVue,
        },
        {
          path: "settings",
          name: "settings",
          meta: { title: "환경설정", requiresAuth: true },
          component: Settings,
        },
        {
          path: "whooing/callback/:random",
          name: "callback",
          props: true,
          meta: { title: "로그인중..." },
          component: LoginCallBack,
        },
      ],
    },
    { path: "login", redirect: "/" },
    { path: "pwa", redirect: "/" },
    { path: "*", redirect: "/" },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!UserModule.isLogin) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }
  }
  next();
});

router.afterEach((to, from) => {
  AppModule.SET_HEADERTITLE(to.meta.title || "이거샀어!");
});

export default router;
