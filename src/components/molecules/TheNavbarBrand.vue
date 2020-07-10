<template>
  <div class="navbar-brand">
    <AtomHeadingBrand />
    <AtomNavbarBurger />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AtomHeadingBrand from "../atoms/AtomHeadingBrand.vue";
import AtomNavbarBurger from "../atoms/AtomNavbarBurger.vue";

export default class TheNavbarBrand extends Vue.extend({
  components: {
    AtomHeadingBrand: AtomHeadingBrand,
    AtomNavbarBurger: AtomNavbarBurger
  }
}) {}
</script>
