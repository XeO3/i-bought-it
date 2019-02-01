<template>
  <v-container align-center>
    <v-layout row wrap class="text-xs-center">
      <v-flex xs12>
        <img alt="Vue logo" src="../assets/logo.svg" style="max-height:400px;">
      </v-flex>
      <v-flex xs12>
        <h1>
          이거샀어! I bought it for
          <b>Whooing</b>
        </h1>
        <p>
          외출시 현금(혹은 교통카드 등)사용 내역을
          <a :href="whooingUrl" target="_blank" rel="noopener">후잉가계부</a>로 재빠르게 입력가능 하도록 도와주는 웹앱입니다.
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Urls from '@/config/Urls';

@Component
export default class Home extends Vue {
  get whooingUrl() {
    return Urls.whooing;
  }
}
</script>
