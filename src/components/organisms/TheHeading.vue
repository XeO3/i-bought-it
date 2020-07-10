<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <TheNavbarBrand />

    <div class="navbar-menu">
      <div class="navbar-start">
        <span class="navbar-item">{{ title }}</span>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <AtomButtonLogin />
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import TheNavbarBrand from "../molecules/TheNavbarBrand.vue";
import AtomButtonLogin from "../atoms/AtomButtonLogin.vue";

export default class TheHeading extends Vue.extend({
  props: {
    title: {
      type: String
    }
  },
  components: {
    TheNavbarBrand: TheNavbarBrand,
    AtomButtonLogin: AtomButtonLogin
  }
}) {}
</script>
