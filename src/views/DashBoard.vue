<template>
  <v-container grid-list-lg fluid pa-0>
    <v-layout v-if="dashboardData.length > 0" row wrap>
      <v-flex v-for="(section) in dashboardData" :key="section.section_id" xs12>
        <v-card>
          <v-card-title
            primary-title
            class="secondary white--text py-3 text-truncate title"
          >{{section.title}}</v-card-title>
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex v-for="account in section.accounts" :key="account.account_id" xs6 sm4 md3 lg2>
                <v-card ripple @click="PushInput(section.section_id ,account.account_id)">
                  <v-card-title
                    class="pt-2 pb-1 purple darken-1 white--text text-truncate"
                  >{{account.title}}</v-card-title>
                  <v-card-text class="text-xs-right body-2">{{account.money.toLocaleString()}}</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <template v-else>
      <p>
        <code>Settings</code>화면에서 초기화면 표시 항목을 선택해주세요.
      </p>
      <p class="text-xs-center">
        <v-btn replace to="settings">설정 바로가기</v-btn>
      </p>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AppDataModule, UserModule, SettingsModule } from '@/store/store';
import dateFns from 'date-fns';
import { IWhooingSection } from '@/models/IWhooingSection';
import {
  DashboardBalaceHelper,
  IDashboardBalanceItem,
} from '@/helpers/DashboardBalaceHelper.ts';

@Component
export default class DashBoardVue extends Vue {
  get dashboardData() {
    return DashboardBalaceHelper.Get();
  }
  get lastSyncDate() {
    return AppDataModule.balancesSyncDate;
  }
  get isEnableSyncButton() {
    return dateFns.isBefore(
      this.lastSyncDate || new Date(),
      dateFns.addHours(new Date(), -1),
    );
  }

  public created() {
    if (
      dateFns.isBefore(
        this.lastSyncDate || new Date(),
        dateFns.addHours(new Date(), -1),
      )
    ) {
      AppDataModule.FetchWhooingBs();
    }
  }

  private PushInput(sId: string, right: string): void {
    this.$router.push({ name: 'input', query: { sId, right } });
  }
}
</script>

