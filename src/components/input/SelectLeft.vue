<template>
  <v-select :items="options"
            v-model="model"
            return-object
            item-text="label"
            item-value="value"
            label="왼쪽"></v-select>
</template>

<script>
export default {
  props: {
    options: Array,
    value: Object
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
