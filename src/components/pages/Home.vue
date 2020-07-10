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
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Home extends Vue.extend({}) {}
</script>
