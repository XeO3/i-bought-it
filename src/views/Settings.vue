<template>
  <v-container pt-0 fill-height>
    <v-layout row wrap align-content-start>
      <v-flex xs12 class="my-2 text-xs-right">
        <v-btn @click="Refresh" :disabled="isLoading" :loading="isLoading" round>
          <v-icon>refresh</v-icon>
          <span class="hidden-sm-and-down">새로고침</span>
        </v-btn>
      </v-flex>
      <v-flex xs12 sm12>
        <v-card class="mb-2">
          <v-toolbar color="teal" dark>
            <v-toolbar-title>초기화면 표시 항목 선택</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>help</v-icon>
            </v-btn>
          </v-toolbar>
          <v-expansion-panel v-if="!isLoading">
            <v-expansion-panel-content
              v-for="(section, section_i) in sections"
              :key="section.section_id"
            >
              <div slot="header">{{section_i+1}}. {{section.title}}</div>
              <v-card>
                <v-card-text v-if="section.accounts">
                  <v-list subheader>
                    <v-subheader>자산</v-subheader>
                    <v-list-tile
                      v-for="asset in section.accounts.assets.filter(o=> IsShowAccount(o))"
                      :key="asset.account_id"
                    >
                      <v-list-tile-action>
                        <v-checkbox
                          :input-value="GetPinedList(section.section_id)"
                          :value="asset.account_id"
                          @change="val => SetPinedList(section.section_id, val)"
                          :label="asset.title"
                          ripple
                        ></v-checkbox>
                      </v-list-tile-action>
                    </v-list-tile>
                    <v-subheader>부채</v-subheader>
                    <v-list-tile
                      v-for="asset in section.accounts.liabilities.filter(o=> IsShowAccount(o))"
                      :key="asset.account_id"
                    >
                      <v-list-tile-action>
                        <v-checkbox
                          :input-value="GetPinedList(section.section_id)"
                          :value="asset.account_id"
                          @change="val => SetPinedList(section.section_id, val)"
                          :label="asset.title"
                          ripple
                        ></v-checkbox>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-divider></v-divider>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { WhooingAccountModel } from "@/models/WhooingAccountModel";
import { SettingsHelper } from "@/store/modules/Settings";
import { SettingsModule, UserModule } from "@/store/store";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class SettingsVue extends Vue {
  private isLoading: boolean = false;

  get sections() {
    return UserModule.sectionList;
  }

  public IsShowAccount(account: WhooingAccountModel): boolean {
    if (account.type === "group") {
      return false;
    }
    if (WhooingAccountModel.IsClosed(account)) {
      return false;
    }
    return true;
  }

  public GetPinedList(section_id: string): string[] {
    const section = SettingsHelper.Get_SettingSecion(
      SettingsModule,
      section_id,
    );
    return section.pinedList;
  }
  public SetPinedList(section_id: string, pinedList: string[]) {
    SettingsModule.Set_PinedList({ section_id, pinedList });
  }

  private async Refresh() {
    this.isLoading = true;
    await UserModule.FetchUserInfoAsync();
    await UserModule.FetchSectionList();
    this.isLoading = false;
  }
}
</script>
