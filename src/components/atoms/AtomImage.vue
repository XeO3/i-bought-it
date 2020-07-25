<template>
  <figure class="iamge">
    <img :src="src" :alt="alt" :width="width" :height="height" />
  </figure>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";

const AtomImage = defineComponent({
  props: {
    src: {
      type: String,
      required: true
    },
    alt: String,
    width: [String, Number],
    height: [String, Number]
  }
});
export default AtomImage;
</script>
