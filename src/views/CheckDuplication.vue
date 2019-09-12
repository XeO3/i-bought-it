<template>
  <v-container fill-height>
    <v-layout row wrap align-content-start>
      <v-flex xs12>
        <v-card class="mb-2">
          <v-toolbar color="teal" dark>
            <v-toolbar-title>중복거래 검색 조건</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>help</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 class="text-xs-center">
                <v-menu
                  :close-on-content-click="false"
                  v-model="menu.startDate"
                  lazy
                  transition="slide-y-transition"
                  offset-y
                  min-width="290px"
                >
                  <v-chip slot="activator">{{searchForm.startDate}}</v-chip>
                  <v-date-picker v-model="searchForm.startDate" @input="menu.startDate = false"></v-date-picker>
                </v-menu>
                <v-menu
                  :close-on-content-click="false"
                  v-model="menu.endDate"
                  lazy
                  transition="slide-y-transition"
                  offset-y
                  min-width="290px"
                >
                  <v-chip slot="activator">{{searchForm.endDate}}</v-chip>
                  <v-date-picker v-model="searchForm.endDate" @input="menu.endDate = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs6 sm3 md2>
                <v-switch v-model="searchForm.isSameDate" label="날짜"></v-switch>
              </v-flex>
              <v-flex xs6 sm3 md2>
                <v-switch v-model="searchForm.isSameItem" label="아이템"></v-switch>
              </v-flex>
              <v-flex xs6 sm3 md2 offset-md1>
                <v-switch v-model="searchForm.isSameMoney" label="금액"></v-switch>
              </v-flex>
              <v-flex xs6 sm3 md2>
                <v-switch v-model="searchForm.isSameLeft" label="왼쪽"></v-switch>
              </v-flex>
              <v-flex xs6 sm3 md2>
                <v-switch v-model="searchForm.isSameRight" label="오른쪽"></v-switch>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue darken-1" flat @click="clearSearchForm">clear</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="info" @click="getRawData">
              검색
              <v-icon right>search</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        {{rawData}}
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import fns from "date-fns";
import {
  getWhooingEntries,
  IWhooingEntriesResults,
} from "../api/GetWhooingEntries";
import {
  IWhoooingGetEntriesParams,
  WhoooingGetEntriesParams,
} from "@/models/IWhoooingGetEntriesPayload";
import { WhooingEntryModel } from "@/models/WhooingEntryModel";
import { WhooingDate } from "../utils/WhooingDate";

@Component
export default class CheckDuplication extends Vue {
  @Prop({ required: true, type: String })
  public section_id!: string;
  public searchForm: SearchForm = new SearchForm(this.section_id);
  public menu = {
    startDate: false,
    endDate: false,
  };
  public state = {
    isLoadingRawData: false,
  };
  public rawData: WhooingEntryModel[] = [];

  public clearSearchForm() {
    this.searchForm = new SearchForm(this.section_id);
  }

  // 거래불러오기
  public async getRawData() {
    this.state.isLoadingRawData = true;
    const params = this.createGetRawDataParams();
    const result: WhooingEntryModel[] = [];
    this.rawData = result;
    while (this.rawData === result) {
      const { results } = await getWhooingEntries(params);
      const { rows } = results;
      result.push(...results.rows);
      if (rows.length !== params.limit) {
        break;
      }
    }
    this.state.isLoadingRawData = false;
  }

  // 거래불러오기 조건 설정
  private createGetRawDataParams(): WhoooingGetEntriesParams {
    const params = new WhoooingGetEntriesParams(this.section_id);
    params.start_date = WhooingDate.ConvertNumber(
      new Date(this.searchForm.startDate),
    );
    params.end_date = WhooingDate.ConvertNumber(
      new Date(this.searchForm.endDate),
    );

    return params;
  }
}

class SearchForm {
  section_id: string;
  startDate: string;
  endDate: string;
  isSameMoney: boolean = true;
  isSameItem: boolean = false;
  isSameLeft: boolean = false;
  isSameRight: boolean = true;
  isSameDate: boolean = false;
  constructor(section_id: string) {
    this.section_id = section_id;
    const today = new Date();
    const starDate = new Date(today.getFullYear(), today.getMonth());
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.startDate = fns.format(starDate, "YYYY-MM-DD");
    this.endDate = fns.format(endDate, "YYYY-MM-DD");
  }
}
</script>