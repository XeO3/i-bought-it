<template>
  <v-app id="app">
    <left-nav></left-nav>
    <v-toolbar color="primary" app absolute clipped-left>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>
        <span class="title ml-3 mr-5">
          이거샀어!&nbsp;
          <span class="text">for Whooing</span>
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LeftNav from '@/views/layouts/navs/LeftNav';

@Component({
  components: {
    LeftNav,
  },
})
export default class App extends Vue {
  // public ToggleLeftNav() {
  //   AppModule.ToggleSideBar();
  // }
}
</script>
