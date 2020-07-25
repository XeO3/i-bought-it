<template>
  <div class="navbar-brand">
    <AtomHeadingBrand />
    <AtomNavbarBurger />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import AtomHeadingBrand from "../atoms/AtomHeadingBrand.vue";
import AtomNavbarBurger from "../atoms/AtomNavbarBurger.vue";

const TheNavbarBrand = defineComponent({
  components: {
    AtomHeadingBrand: AtomHeadingBrand,
    AtomNavbarBurger: AtomNavbarBurger
  }
});
export default TheNavbarBrand;
</script>
