<script>
function inputDot (input) {
  let val = ''
  if (input) {
    val = '0.'
  } else if (input.indexOf('.') >= 0) {
    val = ''
  }
  return (input || '') + val
}

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
      switch (val) {
        case '.':
          this.input = inputDot(this.input)
          break
        default:
          this.input = (this.input || '') + val
      }
      this.onInput()
    },
    clear () {
      this.input = ''
      this.onInput()
    },
    backspace () {
      this.input = this.input.substring(0, this.input.length - 1)
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
                    hide-details
                    @input="onInput">
      </v-text-field>
    </v-card-actions>
    <v-container fluid
                 grid-list-md>
      <v-layout row
                wrap>
        <v-flex xs4>
          <v-btn color="red lighten-1"
                 block
                 dark
                 x-large
                 @click="clear">
            Clear
          </v-btn>
        </v-flex>
        <v-flex xs4
                offset-xs4>
          <v-btn block
                 color="blue-grey lighten-3"
                 x-large
                 @click="backspace">
            <v-icon>backspace</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row
                wrap>

        <v-flex v-for="k in keys"
                :key="k"
                xs4>
          <v-btn v-if="k"
                 color="grey lighten-4"
                 block
                 large
                 @click="inputKey(k)">
            {{k}}
          </v-btn>
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
