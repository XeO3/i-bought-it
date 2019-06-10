<template>
  <v-app>
    <template>
      <router-view name="top"></router-view>
      <router-view name="left"></router-view>
      <router-view></router-view>
    </template>
    <Snackbar></Snackbar>
    <login-modal v-show="false" ref="login"></login-modal>
  </v-app>
</template>

<script lang="ts">
import Snackbar from "@/views/layouts/Snackbar.vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import { AuthModule, UserModule } from "./store/store";
import LoginModal from "./components/login/LoginModal.vue";

@Component({ components: { Snackbar, LoginModal } })
export default class App extends Vue {
  get requiresAuth() {
    return this.$route.matched.some((o) => o.meta.requiresAuth === true);
  }
  get tokenExpiration(): boolean {
    return AuthModule.tokenExpiration;
  }
  get isLogin(): boolean {
    return UserModule.isLogin;
  }

  @Watch("tokenExpiration")
  ontokenExpiration(newVal: boolean, oldVal: boolean) {
    if (this.tokenExpiration) {
      (this.$refs["login"] as LoginModal).Submit();
    }
  }
}
</script>