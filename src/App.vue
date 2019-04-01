<template>
  <v-app>
    <router-view name="top"></router-view>
    <router-view name="left"></router-view>
    <router-view></router-view>
    <Snackbar></Snackbar>
  </v-app>
</template>

<script lang="ts">
import Snackbar from "@/views/layouts/Snackbar.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({ components: { Snackbar } })
export default class App extends Vue {}
</script>