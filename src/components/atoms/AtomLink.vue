<template>
  <router-link :to="href">
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

const AtomLink = defineComponent({
  props: {
    href: {
      type: String,
      required: true
    }
  }
});
export default AtomLink;
</script>
