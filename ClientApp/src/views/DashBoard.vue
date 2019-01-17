<template>
  <div>
    <div v-for="(bal, i) in balances" :key="i">{{bal}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AppDataModule } from '@/store/store';
import dateFns from 'date-fns';

@Component
export default class DashBoardVue extends Vue {
  get balances() {
    return AppDataModule.balances;
  }
  public created() {
    if (
      dateFns.isBefore(
        AppDataModule.balancesSyncDate || new Date(),
        dateFns.addHours(new Date(), -1),
      )
    ) {
      AppDataModule.FetchWhooingBs();
    }
  }
}
</script>

