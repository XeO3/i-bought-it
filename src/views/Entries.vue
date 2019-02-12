<template>
  <v-container>
    <v-layout wrap row>
      <v-flex xs12>
        <v-card>
          <v-list two-line>
            <template v-for="(item, index) in entriesData">
              <v-list-tile :key="item.id">
                <v-list-tile-content>
                  <v-list-tile-sub-title>
                    <small>{{item.date}}</small>
                    <v-chip small>{{item.left.title}}</v-chip>
                    <v-chip small>{{item.right.title}}</v-chip>
                  </v-list-tile-sub-title>
                  <v-list-tile-title>{{ item.item }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{item.memo}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-menu offset-y bottom left>
                    <v-btn small icon slot="activator">
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                    <v-list>
                      <!-- <v-list-tile  @click="item.active = true">
                        <v-list-tile-title><v-icon left>call_split</v-icon>재입력</v-list-tile-title>
                      </v-list-tile>-->
                      <!-- <v-list-tile v-if="!item.deleted" @click="Delete(item)">
                        <v-list-tile-title class="red--text text--darken-2">
                          <v-icon color="red darken-2" left>delete</v-icon>삭제
                        </v-list-tile-title>
                      </v-list-tile> -->
                    </v-list>
                  </v-menu>
                  <v-list-tile-action-text class="headline text--primary">{{item.money}}</v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < entriesData.length" :key="index"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import fns from 'date-fns';
import { Component, Vue } from 'vue-property-decorator';
import { IWhooingSection } from '@/models/IWhooingSection';
import { UserModule, EntriesModule } from '@/store/store';
import { UserHelper } from '@/store/modules/User';
import { EntriesHelper } from '@/store/modules/Entries';
import { WhooingDate } from '@/utils/WhooingDate';

@Component
export default class EntriesVue extends Vue {
  public entriesHeaders = [
    { text: '날자', value: 'date' },
    { text: '아이템', value: 'item' },
    { text: '왼쪽', value: 'leftText' },
    { text: '오른쪽', value: 'rightText' },
  ];

  get sections(): IWhooingSection[] {
    return UserModule.sectionList;
  }

  get sId(): string {
    if (this.$route.query.sId) {
      return this.$route.query.sId as string;
    } else {
      const sId = this.sections[0].section_id;
      this.sId = sId;
      return sId;
    }
  }
  set sId(v) {
    this.$router.replace({
      name: 'entries',
      query: { sId: v },
    });
  }
  get sIdName() {
    return UserHelper.GetSectionName(this.sId);
  }

  get left(): string {
    return this.$route.query.left as string;
  }
  set left(v) {
    this.$router.replace({
      name: 'entries',
      query: { ...this.$route.query, left: v },
    });
  }
  get right(): string {
    return this.$route.query.right as string;
  }
  set right(v) {
    this.$router.replace({
      name: 'entries',
      query: { ...this.$route.query, right: v },
    });
  }
  get money(): string {
    return this.$route.query.money as string;
  }
  set money(v) {
    this.$router.replace({
      name: 'entries',
      query: { ...this.$route.query, money: v },
    });
  }
  get item(): string {
    return this.$route.query.item as string;
  }
  set item(v) {
    this.$router.replace({
      name: 'entries',
      query: { ...this.$route.query, item: v },
    });
  }
  get memo(): string {
    return this.$route.query.memo as string;
  }
  set memo(v) {
    this.$router.replace({
      name: 'entries',
      query: { ...this.$route.query, memo: v },
    });
  }

  get entriesData() {
    const entriesSection = EntriesHelper.FindSection(this.sId);
    if (entriesSection) {
      return entriesSection.data.map((o) => {
        const left = UserHelper.GetAccount(this.sId, o.l_account_id) || {
          title: '',
        };
        const right = UserHelper.GetAccount(this.sId, o.r_account_id) || {
          title: '',
        };
        return {
          id: o.entry_id,
          date: fns.format(WhooingDate.ParseNumber(o.entry_date), 'YYYY-MM-DD'),
          item: o.item,
          money: o.money.toLocaleString(),
          memo: o.memo,
          leftText: left.title,
          rightText: right.title,
          left,
          right,
        };
      });
    }
  }
  public Delete({ id }: { id: number }) {
    const entriesSection = EntriesHelper.FindSection(this.sId);
     if (entriesSection) {
       const data = entriesSection.data.filter(o=>o.entry_id !== id);
       EntriesModule.Set_EntryItem({section_id: this.sId, data, syncDate : new Date() });
     }
  }
}
</script>