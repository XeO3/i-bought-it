<script>
export default {
  props: {
    value: [String, Number]
  },
  data () {
    return {
      input: 0,
      keys: [
        '7', '8', '9',
        '4', '5', '6',
        '1', '2', '3',
        '00', '0', '.']
    }
  },
  methods: {
    inputKey (val) {
      if (val === '.' && this.input.indexOf('.') >= 0) {
      } else {
        this.input = (this.input || '') + val
      }
    }
  }
}
</script>
<template>
  <v-card>
    <v-card-actions>
      <v-text-field label="금액입력"
                    solo
                    clearable
                    class="input-right"
                    v-model="input">W
      </v-text-field>
    </v-card-actions>
    <v-container fluid
                 grid-list-sm>
      <v-layout row
                wrap>
        <v-flex v-for="k in keys"
                :key="k"
                xs4>
          <v-btn color="success"
                 block
                 v-on:click="inputKey(k)">{{k}}</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<style>
.input-right input {
  text-align: right;
}
</style>
