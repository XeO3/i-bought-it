<template>
  <a
    role="button"
    class="navbar-burger burger"
    aria-label="menu"
    aria-expanded="false"
    data-target="navbarBasicExample"
  >
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
  </a>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class AtomNavbarBurger extends Vue.extend({}) {}
</script>
