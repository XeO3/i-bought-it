<template>
  <v-container>
    <v-layout wrap row>
      <v-flex xs12>
        <v-card>
          <v-list two-line>
            <template v-for="(item, index) in entriesData">
              <v-list-tile :key="item.entry_id" ripple>
                <v-list-tile-content>
                  <v-list-tile-sub-title>
                    <v-chip small>{{item.left.title}}</v-chip>
                    <v-chip small>{{item.right.title}}</v-chip>
                  </v-list-tile-sub-title>
                  <v-list-tile-title>{{ item.item }}</v-list-tile-title>
                  <v-list-tile-sub-title>
                      {{item.memo}}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>{{item.date}}</v-list-tile-action-text>
                  <v-list-tile-action-text
                    class="headline text--primary"
                  >{{item.money.toLocaleString()}}</v-list-tile-action-text>
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
        return {
          date: fns.format(WhooingDate.ParseNumber(o.entry_date), 'YYYY-MM-DD'),
          item: o.item,
          money: o.money,
          memo: o.memo,
          left: UserHelper.GetAccount(this.sId, o.l_account_id),
          right: UserHelper.GetAccount(this.sId, o.r_account_id),
        };
      });
    }
  }
}
</script>