<template>
  <v-layout align-start align-content-start row wrap>
    <v-flex xs12>
      <v-form>
        <v-card>
          <v-card-text>
            <v-container pa-0 grid-list-lg>
              <v-layout row wrap>
                <v-flex xs12>
                  <div class="text-xs-center">
                    <v-chip>{{sIdName}}</v-chip>
                    <v-chip>{{date}}</v-chip>
                    <InputAccountModal v-model="left" :sectionId="sId" left></InputAccountModal>
                    <InputAccountModal v-model="right" :sectionId="sId" right></InputAccountModal>
                  </div>
                </v-flex>
                <v-flex xs6 md3>
                  <v-text-field v-model="item" label="아이템" required clearable></v-text-field>
                </v-flex>
                <v-flex xs6 md3>
                  <v-text-field v-model="money" label="금액" type="number" required reverse clearable></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-form>
    </v-flex>
    <v-flex xs12 mt-3 v-if="suggestionItems.length> 0">
      <v-card>
        <v-data-table
          :headers="suggestionHeaders"
          :items="suggestionItems"
          hide-headers
          hide-actions
          :rowsPerPage="-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.calories }}</td>
            <td class="text-xs-right">{{ props.item.fat }}</td>
            <td class="text-xs-right">{{ props.item.carbs }}</td>
            <td class="text-xs-right">{{ props.item.protein }}</td>
            <td class="text-xs-right">{{ props.item.iron }}</td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
    <v-flex xs12 mt-3 class="text-xs-center">
      <v-btn
        large
        color="success"
        :disabled="!Inputtable || entryLoading"
        :loading="entryLoading"
        @click="PushEntry"
      >입력
        <v-icon right>send</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { UserModule } from '@/store/store';
import { WhooingDate } from '@/utils/WhooingDate';
import fns from 'date-fns';
import { UserHelper } from '@/store/modules/User';
import InputAccountModal from '@/components/InputAccountModal.vue';
import { postWhooingEntries } from '@/api/PostWhooingEntries';
import {
  PostWhooingEntriesData,
  IPostWhooingEntriesData,
} from '@/models/PostWhooingEntriesData';

@Component({
  components: {
    InputAccountModal,
  },
})
export default class Input extends Vue {
  private entryLoading: boolean = false;

  get sId(): string {
    return this.$route.query.sId as string;
  }
  set sId(v) {
    this.$router.replace({
      name: 'input',
      query: { ...this.$route.query, sId: v },
    });
  }
  get sIdName() {
    return UserHelper.GetSectionName(this.sId);
  }
  get date(): string {
    if (this.$route.query.date) {
      return this.$route.query.date as string;
    } else {
      const date = fns.format(new Date(), 'YYYY-MM-DD');
      this.date = date;
      return date;
    }
  }
  set date(v) {
    this.$router.replace({
      name: 'input',
      query: { ...this.$route.query, date: v },
    });
  }
  get left(): string {
    return this.$route.query.left as string;
  }
  set left(v) {
    this.$router.replace({
      name: 'input',
      query: { ...this.$route.query, left: v },
    });
  }
  get right(): string {
    return this.$route.query.right as string;
  }
  set right(v) {
    this.$router.replace({
      name: 'input',
      query: { ...this.$route.query, right: v },
    });
  }
  get money(): string {
    return this.$route.query.money as string;
  }
  set money(v) {
    this.$router.replace({
      name: 'input',
      query: { ...this.$route.query, money: v },
    });
  }
  get item(): string {
    return this.$route.query.item as string;
  }
  set item(v) {
    this.$router.replace({
      name: 'input',
      query: { ...this.$route.query, item: v },
    });
  }
  get tag(): string {
    return this.$route.query.tag as string;
  }
  set tag(v) {
    this.$router.replace({
      name: 'input',
      query: { ...this.$route.query, tag: v },
    });
  }
  get memo(): string {
    return this.$route.query.memo as string;
  }
  set memo(v) {
    this.$router.replace({
      name: 'input',
      query: { ...this.$route.query, memo: v },
    });
  }
  get Inputtable() {
    if (
      this.sId &&
      this.item &&
      this.left &&
      this.right &&
      this.date &&
      this.money
    ) {
      return true;
    } else {
      return false;
    }
  }
  get suggestionItems() {
    return [];
  }

  public suggestionHeaders = [
    { text: '아이템', value: 'item' },
    { text: '금액', value: 'money' },
    { text: '왼쪽', value: 'left' },
    { text: '오른쪽', value: 'right' },
  ];

  public async PushEntry() {
    this.entryLoading = true;
    try {
      const left = UserHelper.GetAccount(this.sId, this.left);
      const right = UserHelper.GetAccount(this.sId, this.right);
      if (left && right) {
        const data: IPostWhooingEntriesData = {
          section_id: this.sId,
          l_account: left.account,
          l_account_id: left.account_id,
          r_account: right.account,
          r_account_id: right.account_id,
          item: this.item,
          money: Number(this.money),
          memo: this.memo,
        };
        const res = await postWhooingEntries(new PostWhooingEntriesData(data));
        if(res.code === 200){
          
        }else{
          throw Error('거래 입력 실패')
        }
      }
    } finally {
      this.entryLoading = false;
    }
  }
}
</script>

<style>
</style>
