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
import { defineComponent } from "@vue/composition-api";
import TheNavbarBrand from "../molecules/TheNavbarBrand.vue";
import AtomButtonLogin from "../atoms/AtomButtonLogin.vue";

const TheHeading = defineComponent({
  components: {
    TheNavbarBrand: TheNavbarBrand,
    AtomButtonLogin: AtomButtonLogin
  }
});
export default TheHeading;
</script>
