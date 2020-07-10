<template>
  <figure class="iamge">
    <img :src="src" :alt="alt" :width="width" :height="height" />
  </figure>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class AtomImage extends Vue.extend({
  props: {
    src: {
      type: String,
      required: true
    },
    alt: String,
    width: [String, Number],
    height: [String, Number]
  }
}) {}
</script>
