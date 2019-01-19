<template>
  <div class="hello">
    <img alt="Vue logo"
         src="../assets/logo.svg"
         width="400">
    <h1>이거샀어! I bought it for <b>Whooing</b></h1>
    <p>
      외출시 현금(혹은 교통카드 등)사용 내역을 <a href="https://whooing.com" target="_blank" rel="noopener">후잉가계부</a>로 재빠르게 입력가능 하도록 도와주는 웹앱입니다.
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
