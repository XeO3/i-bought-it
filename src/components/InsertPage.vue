<script>
import { PostWhooingEntriesData, postWhooingEntries } from '../api/postWhooingEntries'
import InputNumberVue from './input/InputNumber.vue'
export default {
  components: {
    InputNumber: InputNumberVue
  },
  data () {
    return {
      input: new PostWhooingEntriesData(
        's36403',
        'expenses',
        'x125',
        'assets',
        'x131',
        0),
      states: {
        isProcessing: false
      },
      result: null
    }
  },
  methods: {
    async insert () {
      try {
        this.states.isProcessing = true
        let res = await postWhooingEntries(this.input)
        this.result = res
        this.input.money = 0
      } catch (e) {
        this.result = e
      } finally {
        this.states.isProcessing = false
      }
    }
  }
}
</script>
<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column
                align-center>
        <input-number v-model="input.money"></input-number>
        <v-btn @click="insert">
          테스트입력
        </v-btn>
        {{result}}
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<style>
</style>
