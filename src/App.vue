<template>
  <div id="app">
    <TheHeading />
    <section class="section">
      <router-view />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TheHeading from "@/components/organisms/TheHeading.vue";

@Component
export default class App extends Vue.extend({
  components: { TheHeading: TheHeading }
}) {}
</script>
