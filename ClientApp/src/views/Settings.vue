<template>
  <v-layout row wrap>
    <v-flex xs12 sm12>
      <v-card class="mb-2">
        <v-toolbar color="teal" dark>
          <v-toolbar-title>초기화면 표시 항목 선택</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>help</v-icon>
          </v-btn>
        </v-toolbar>
        <v-expansion-panel>
          <v-expansion-panel-content
            v-for="(section, section_i) in sections"
            :key="section.section_id"
          >
            <div slot="header">{{section_i+1}}. {{section.title}}</div>
            <v-card>
              <v-card-text>
                <v-list subheader>
                  <v-list-tile
                    v-for="asset in section.accounts.assets"
                    :key="asset.account_id"
                    v-if="IsShowAccount(asset)"
                  >
                    <v-list-tile-action>
                      <v-checkbox
                        v-model="pinedList"
                        :value="asset.account_id"
                        :label="asset.title"
                        ripple
                      ></v-checkbox>
                    </v-list-tile-action>
                    <!-- <v-list-tile-content>
                      <v-list-tile-title>{{ asset.title }}</v-list-tile-title>
                    </v-list-tile-content>-->
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
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { UserModule, SettingsModule } from '@/store/store';
import { WhooingAccountModel } from '@/models/WhooingAccountModel';

@Component({})
export default class Settings extends Vue {
  get sections() {
    return UserModule.sectionList;
  }

  get pinedList() {
    return SettingsModule.pinedList;
  }
  set pinedList(v) {
    SettingsModule.Set_PinedList(v);
  }

  public IsShowAccount(account: WhooingAccountModel): boolean {
    if (account.type === 'group') {
      return false;
    }
    if (WhooingAccountModel.IsClosed(account)) {
      return false;
    }
    return true;
  }

  public Toggle_PinedItem(account_id: string) {
    SettingsModule.Toggle_PinedItem(account_id);
  }
}
</script>
