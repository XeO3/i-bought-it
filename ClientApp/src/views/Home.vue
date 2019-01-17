<template>
  <div class="home">
    <img alt="Vue logo"
         src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <dash></dash>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import DashBoardVue from '@/views/DashBoard.vue';


@Component({
  components: {
    HelloWorld,
    Dash: DashBoardVue,
  },
})
export default class Home extends Vue {}
</script>
