<script>
export default {
  props: {
    value: [Number]
  },
  data () {
    return {
      input: '',
      keys: [
        '7', '8', '9',
        '4', '5', '6',
        '1', '2', '3',
        '00', '0', '.']
    }
  },
  computed: {
    inputNumber () {
      try {
        return Number(this.input.trim('.'))
      } catch (e) {
        return null
      }
    }
  },
  methods: {
    inputKey (val) {
      if (val === '.') {
        if (!this.input) {
          val = '0.'
        } else if (this.input.indexOf('.') >= 0) {
          val = ''
        }
      }
      this.input = (this.input || '') + val
      this.onInput()
    },
    onInput () {
      this.$emit('input', this.inputNumber)
    }
  },
  watch: {
    'value' (newVal, oldVal) {
      if (newVal !== this.inputNumber) {
        console.log(newVal)
        this.input = (newVal ? newVal.ToString() : '0')
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
                    v-model="input"
                    @input="onInput">
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
                 @click="inputKey(k)">{{k}}</v-btn>
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
