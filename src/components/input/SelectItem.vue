<template>
  <v-select :items="options"
            v-model="model"
            label="아이템"></v-select>
</template>

<script>
export default {
  props: {
    options: Array,
    value: String
  },
  computed: {
    model: {
      get () { return this.value },
      set (v) { this.$emit('input', v) }
    }
  }
}
</script>

<style>
</style>
