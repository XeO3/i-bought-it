<template>
  <v-menu offset-y>
    <v-btn slot="activator" color="primary" dark>{{buttonText}}</v-btn>
    <v-list>
      <v-list-tile v-for="(asset, index) in assets" :key="index">
        <v-list-tile-title>{{ asset }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UserModule } from '@/store/store';
import { UserHelper } from '@/store/modules/User';

@Component
export default class InputAccountModal extends Vue {
  @Prop({ type: String, required: true })
  public sectionId!: string;
  @Prop(String)
  public value!: string;
  @Prop({ type: Boolean, default: false })
  public left!: boolean;
  @Prop({ type: Boolean, default: false })
  public right!: boolean;

  get buttonText() {
    if (this.left) {
      return '왼쪽';
    } else if (this.right) {
      return '오른쪽';
    }
  }

  get accounts() {
    const section = UserHelper.GetSection(this.sectionId);
    if (section && section.accounts) {
      return section.accounts;
    }
    throw Error('accounts가 유효하지 않습니다.');
  }

  get assets() {
    return this.accounts.assets;
  }

  get liabilities() {
    return this.accounts.liabilities;
  }

  get capital (){
    return this.accounts.capital
  }

  get income (){
    return this.accounts.income
  }

  get expenses (){
    return this.accounts.expenses
  }

  get items() {
    return ['aa', 'bb'];
  }
}
</script>
