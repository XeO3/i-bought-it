<template>
  <v-content>
    <v-container fluid fill-height align-start class="grey lighten-4">
      <router-view></router-view>
    </v-container>
  </v-content>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LeftNav from '@/views/layouts/navs/LeftNav.vue';

@Component({
  components: {
    LeftNav,
  },
})
export default class Layout extends Vue {
   get store(): any {
    return this.$store;
  }
}
</script>
