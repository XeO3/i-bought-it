<script>
import { mapState, mapMutations } from 'vuex'
import { pushHistory } from '../store/mutation-types'
import { PostWhooingEntriesData, postWhooingEntries } from '../api/postWhooingEntries'
import InputNumberVue from './input/InputNumber.vue'
import SelectRightVue from './input/SelectRight.vue'
import SelectLeftVue from './input/SelectLeft.vue'
import SelectItemVue from './input/SelectItem.vue'

export default {
  components: {
    InputNumber: InputNumberVue,
    SelectRight: SelectRightVue,
    SelectLeft: SelectLeftVue,
    SelectItem: SelectItemVue
  },
  data () {
    return {
      leftItem: null,
      rightItem: null,
      item: null,
      money: 0,
      states: {
        isProcessing: false
      },
      result: null
    }
  },
  computed: {
    ...mapState({
      settings: state => state.settings
    })

  },
  methods: {
    ...mapMutations([pushHistory]),
    createInput () {
      let input = new PostWhooingEntriesData(
        this.settings.sectionId,
        this.leftItem.accountsType,
        this.leftItem.value,
        this.rightItem.accountsType,
        this.rightItem.value,
        this.money)
      input.item = this.item
      input.memo = `time:${new Date()}`
      return input
    },
    async insert () {
      try {
        this.states.isProcessing = true
        let data = await postWhooingEntries(this.createInput())
        this.pushHistory(data.results[0])
        this.result = '입력 성공'
        this.input.money = 0
      } catch (e) {
        this.result = e
      } finally {
        this.states.isProcessing = false
      }
    }
  },
  created () {
    this.item = this.settings.itemList[0]
    this.rightItem = this.settings.rightMenuList[0]
    this.leftItem = this.settings.leftMenuList[0]
  }
}
</script>
<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column
                align-center>
        <input-number v-model="money"></input-number>
        <select-item v-model="item"
                     :options="settings.itemList"></select-item>
        <select-left v-model="leftItem"
                     :options="settings.leftMenuList"></select-left>
        <select-right v-model="rightItem"
                      :options="settings.rightMenuList"></select-right>

        <v-btn @click="insert"
               :loading="states.isProcessing">
          테스트입력
        </v-btn>
        {{result}}
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<style>
</style>
