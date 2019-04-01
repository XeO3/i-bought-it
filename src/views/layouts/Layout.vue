<template>
  <v-content>
    <v-container fluid fill-height pa-0 class="grey lighten-4">
      <router-view></router-view>
    </v-container>
  </v-content>
</template>
<script lang="ts">
import LeftNav from "@/views/layouts/navs/LeftNav.vue";
import { Component, Vue } from "vue-property-decorator";

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
