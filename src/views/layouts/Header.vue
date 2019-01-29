<template>
  <v-toolbar color="blue-grey lighten-4" app absolute clipped-left>
    <v-toolbar-side-icon @click="ToggleSidebar">
      <v-icon>menu</v-icon>
    </v-toolbar-side-icon>
    <v-toolbar-title>
      <span class="title ml-3">
        이거샀어!&nbsp;
        <span class="text">for Whooing</span>
      </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <login-modal v-if="!isLogin"></login-modal>
    <v-menu v-else offset-y left>
      <v-btn slot="activator" icon>
        <v-icon>person</v-icon>
      </v-btn>
      <v-card>
        <v-card-title class="title text-xs-center">
          {{ userName }}
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="green">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-toolbar>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AppModule, UserModule } from '@/store/store';
import LoginModal from '@/components/login/LoginModal.vue';

@Component({
  components: {
    LoginModal,
  },
})
export default class Header extends Vue {
  // public functional: true = true;
  public ToggleSidebar() {
    AppModule.ToggleSideBar();
  }

  get isLogin() {
    return UserModule.isLogin;
  }

  get userName() {
    if (UserModule.userInfo) {
      return UserModule.userInfo.username;
    }
  }
}
</script>
