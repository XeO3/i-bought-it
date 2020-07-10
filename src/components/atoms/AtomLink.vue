<template>
  <a :href="href">
    <slot></slot>
  </a>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class AtomLink extends Vue.extend({
  props: {
    href: {
      type: String,
      required: true
    }
  }
}) {}
</script>
