<template>
  <v-toolbar color="primary" app absolute clipped-left>
    <v-toolbar-side-icon @click="ToggleSidebar">
      <v-icon>menu</v-icon>
    </v-toolbar-side-icon>
    <v-toolbar-title>
      <span class="title ml-3 mr-5">
        이거샀어!&nbsp;
        <span class="text">for Whooing</span>
      </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <login-modal></login-modal>
  </v-toolbar>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/App';
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
}

</script>
