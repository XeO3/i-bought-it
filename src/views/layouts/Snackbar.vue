<template>
  <v-snackbar v-if="snackbar" v-model="snackbar" v-bind="snackbarItem" vertical>
    {{ snackbarItem ? snackbarItem.text : '' }}
    <v-btn dark flat @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LeftNav from "@/views/layouts/navs/LeftNav.vue";
import { AppModule } from "@/store/store";

@Component
export default class Snackbar extends Vue {
  get snackbarItem() {
    return AppModule.snackbar;
  }
  get snackbar() {
    return this.snackbarItem !== null;
  }
  set snackbar(v) {
    if (!v) {
      AppModule.SET_SNACKBAR(null);
    }
  }
}
</script>
