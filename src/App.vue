<template>
  <v-app>
    <router-view name="top"></router-view>
    <router-view name="left"></router-view>
    <router-view></router-view>
    <Snackbar></Snackbar>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Snackbar from '@/views/layouts/Snackbar.vue';

@Component({ components: { Snackbar } })
export default class App extends Vue {}
</script>