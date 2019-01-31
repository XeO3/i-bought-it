<template>
  <v-navigation-drawer fixed clipped class="grey lighten-4" app v-model="opened">
    <v-list dense class="grey lighten-4">
      <template v-for="(item, i) in items">
        <v-divider dark v-if="item.divider" class="my-3" :key="i"></v-divider>
        <v-list-tile :key="i" v-else @click="itemClick(item)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="grey--text">{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import LeftItems, { LeftItem, LeftItemClick } from '@/config/LeftItems';
import { AppModule, UserModule } from '@/store/store';

@Component({})
export default class LeftNav extends Vue {
  get isLogin() {
    return UserModule.isLogin;
  }

  get items() {
    return LeftItems.filter((item) => !item.isLogin || this.isLogin);
  }

  get opened(): boolean {
    return AppModule.sidebar.opened;
  }
  set opened(v) {
    AppModule.SET_SIDEBAR(v);
  }

  public itemClick(item: LeftItem) {
    switch (item.click) {
      case LeftItemClick.NewTab:
        this.opened = false;
        const win = window.open(item.link, '_blank');
        if (win instanceof Window) {
          win.focus();
        }
        break;
      case LeftItemClick.Link:
        this.$router.push({ name: item.link });
        break;
    }
  }
}
</script>
