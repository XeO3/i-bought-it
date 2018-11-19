<template>
  <div id="app">
    <v-app id="inspire">
      <left-nav v-model="drawer"></left-nav>
      <v-toolbar color="primary"
                 app
                 absolute
                 clipped-left>
        <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
        <span class="title ml-3 mr-5">이거샀어!&nbsp;<span class="text">for Whooing</span></span>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-content>
        <v-container fluid
                     fill-height
                     class="grey lighten-4">
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LeftNav from './navs/LeftNav';
@Component({
  components: {
    LeftNav,
  },
})
export default class App extends Vue {
  private drawer = false;
}
</script>

<style>
</style>
