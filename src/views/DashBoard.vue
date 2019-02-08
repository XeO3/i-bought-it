<template>
  <v-container pt-0 fill-height>
    <v-layout v-if="dashboardData.length > 0" row wrap align-content-start>
      <v-flex xs12 class="my-2 text-xs-right">
        <v-btn @click="Refresh" :disabled="isLoading" round>
          <v-icon>refresh</v-icon>
          <span class="hidden-sm-and-down">새로고침</span>
        </v-btn>
      </v-flex>
      <v-flex v-for="(section) in dashboardData" :key="section.section_id" class="mb-5" xs12>
        <v-card>
          <v-card-title
            primary-title
            class="grey darken-2 white--text py-3 text-truncate title"
          ><v-icon left dark>widgets</v-icon>{{section.title}}</v-card-title>
          <v-container grid-list-md pa-2>
            <v-layout row wrap>
              <v-flex v-for="account in section.accounts" :key="account.account_id" xs6 sm4 md3 lg2>
                <v-card
                  ripple
                  dark
                  @click="PushInput(section.section_id ,account.account_id)"
                  :color="GetDashboardItemColor(account) + ' darken-1'"
                >
                  <v-card-title class="pb-0">
                    {{account.title}}
                    <v-spacer></v-spacer>
                    <v-progress-circular
                      v-if="account.isLoading"
                      :size="13"
                      :width="2"
                      indeterminate
                      dark
                    ></v-progress-circular>
                  </v-card-title>
                  <v-card-text
                    class="pt-0 text-xs-right headline"
                  >{{account.money.toLocaleString()}}</v-card-text>
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
import { WhooingAccount } from '@/models/EnumWhooingAccount';

@Component
export default class DashBoardVue extends Vue {
  private isLoading: boolean = false;

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

  private Refresh() {
    this.isLoading = true;
    AppDataModule.FetchWhooingBs();
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  private PushInput(sId: string, right: string): void {
    this.$router.push({ name: 'input', query: { sId, right } });
  }

  private GetDashboardItemColor(balanceItem: IDashboardBalanceItem) {
    if(balanceItem.account === WhooingAccount.assets){
      return 'purple';
    }
    if(balanceItem.account === WhooingAccount.liabilities){
      return 'blue';
    }
  }
}
</script>

