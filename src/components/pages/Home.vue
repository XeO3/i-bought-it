<template>
  <div class="container">
    <h1 class="title">Hello World</h1>
    <p class="subtitle">
      My first website with
      <strong>Bulma</strong>!
    </p>
    <img alt="Vue logo" src="@/assets/logo.png" />
    <button class="button">Button</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

const Home = defineComponent({});
export default Home;
</script>
