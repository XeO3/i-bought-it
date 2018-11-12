import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class SelectItem extends Vue {
  @Prop(Array) options!: any[]
  @Prop(String) value!: string

  // computed
  get model() {
    return this.value
  }
  set model(v) {
    this.$emit('input', v)
  }
}
