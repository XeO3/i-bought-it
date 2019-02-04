<template>
  <v-container fill-height>
    <v-layout row wrap align-content-start>
      <v-flex xs12>
        <v-form>
          <v-card>
            <v-card-text>
              <v-container pa-0 grid-list-lg>
                <v-layout row wrap>
                  <v-flex xs12 class="text-xs-center">
                    <v-menu offset-y>
                      <v-chip slot="activator">{{sIdName}}</v-chip>
                      <v-list>
                        <v-list-tile
                          v-for="section in sections"
                          :key="section.section_id"
                          @click="sId = section.section_id"
                        >
                          <v-list-tile-title>{{ section.title }}</v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                    <v-menu
                      :close-on-content-click="false"
                      v-model="menu.date"
                      lazy
                      transition="slide-y-transition"
                      offset-y
                      min-width="290px"
                    >
                      <v-chip slot="activator">{{date}}</v-chip>
                      <v-date-picker v-model="date" @input="menu.date = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12>
                    <div class="text-xs-center">
                      <InputAccountModal v-model="left" :sectionId="sId" left></InputAccountModal>
                      <InputAccountModal v-model="right" :sectionId="sId" right></InputAccountModal>
                    </div>
                  </v-flex>
                  <v-flex xs12 md6 offset-md1>
                    <v-text-field v-model="item" label="아이템" required clearable></v-text-field>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-text-field
                      v-model="money"
                      label="금액"
                      type="number"
                      required
                      reverse
                      clearable
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue darken-1" flat @click="ClearInput">clear</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
      <v-flex xs12 mt-3 v-if="suggestionItems.length> 0 && !item">
        <v-card>
          <v-data-table
            :headers="suggestionHeaders"
            :items="suggestionItems"
            hide-actions
            :rowsPerPage="-1"
            disable-initial-sort
          >
            <template slot="items" slot-scope="props">
              <tr @click="AcceptProposal(props.item)">
                <td class="px-2">{{ props.item.item }}</td>
                <td class="px-2">{{ GetAccountName(sId, props.item.left) }}</td>
                <td class="px-2">{{ GetAccountName(sId, props.item.right) }}</td>
              </tr>
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
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { UserModule, EntriesModule, AppDataModule } from '@/store/store';
import { WhooingDate } from '@/utils/WhooingDate';
import fns from 'date-fns';
import { UserHelper } from '@/store/modules/User';
import InputAccountModal from '@/components/InputAccountModal.vue';
import { postWhooingEntries } from '@/api/PostWhooingEntries';
import {
  PostWhooingEntriesData,
  IPostWhooingEntriesData,
} from '@/models/PostWhooingEntriesData';
import { IEntrySection } from '@/models/IEntriesState';
import {
  InputSuggestionHelper,
  IInputSeggestionItem,
} from '@/helpers/InputSuggestionHelper';
import { WhooingAccount } from '@/models/EnumWhooingAccount';
import { EntriesInputHelper } from '@/helpers/EntriesInputHelper';
import { IWhooingSection } from '@/models/IWhooingSection';

@Component({
  components: {
    InputAccountModal,
  },
})
export default class Input extends Vue {
  public suggestionHeaders = [
    { text: '아이템', value: 'item' },
    { text: '왼쪽', value: 'left' },
    { text: '오른쪽', value: 'right' },
  ];
  private entryLoading: boolean = false;
  private menu = {
    date: false,
  };

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

  get InputItem() {
    return {
      sId: this.sId,
      left: this.left,
      right: this.right,
      money: this.money,
      item: this.item,
      memo: this.memo,
    };
  }

  get suggestionItems() {
    return InputSuggestionHelper.get(this.sId, {
      item: this.item,
      left: this.left,
      right: this.right,
      money: this.money,
    });
  }

  public async PushEntry() {
    this.entryLoading = true;
    try {
      await EntriesInputHelper.PushEntryAsync(this.InputItem);
    } catch (e) {
      alert(e);
    } finally {
      this.entryLoading = false;
    }
  }
  public ClearInput() {
    this.left = '';
    this.right = '';
    this.item = '';
    this.money = '';
    this.date = '';
  }

  public AcceptProposal(item: IInputSeggestionItem) {
    this.left = item.left;
    this.right = item.right;
    this.item = item.item;
  }

  public GetAccountName(section_id: string, account_id: string) {
    return UserHelper.GetAccountName(section_id, account_id);
  }
}
</script>