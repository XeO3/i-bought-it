<template>
  <v-container fill-height>
    <v-layout row wrap align-content-start>
      <v-flex xs12>
        <v-card class="mb-2">
          <v-toolbar color="teal" dark>
            <v-toolbar-title>중복거래 검색</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn icon>
              <v-icon>help</v-icon>
            </v-btn>-->
          </v-toolbar>
          <v-card-text>
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
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <!-- <v-btn color="blue darken-1" flat @click="clearSearchForm">clear</v-btn> -->
            <v-spacer></v-spacer>
            <v-btn color="info" @click="getRawData" :loading="state.isLoadingRawData">
              검색
              <v-icon right>search</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        
        <v-card class="mb-2" v-if="rawData.length>1">
          <v-card-title class="primary py-1 white--text">{{rawData.length}}건 검색되었습니다. 중복 조건을 지정해주세요.</v-card-title>
          <v-card-text class="py-1">
            <v-layout row wrap>
              <v-flex class="mx-1">
                <v-switch v-model="duplicationOptions.isSameDate" label="날짜"></v-switch>
              </v-flex>
              <v-flex class="mx-1">
                <v-switch v-model="duplicationOptions.isSameItem" label="아이템"></v-switch>
              </v-flex>
              <v-flex class="mx-1">
                <v-switch v-model="duplicationOptions.isSameMoney" label="금액"></v-switch>
              </v-flex>
              <v-flex class="mx-1">
                <v-switch v-model="duplicationOptions.isSameLeft" label="왼쪽"></v-switch>
              </v-flex>
              <v-flex class="mx-1">
                <v-switch v-model="duplicationOptions.isSameRight" label="오른쪽"></v-switch>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-card v-else>
          <v-card-title class="primary py-1 white--text">{{rawData.length === 0 ? "검색결과가 없습니다.": `${rawData.length}건 검색되었습니다.`}} 최소 2건 이상의 거래가 필요합니다.</v-card-title>
        </v-card>
        <duplication-group
          :value="{key:key, data:items}"
          :sId="sId"
          v-for="(items, key) in duplicatData"
          :key="key"
          @merge="(mergeSelected, entryIds)=> mergeModalValue = {mergeSelected, entryIds}"
        />
      </v-flex>
    </v-layout>
    <merge-entries-modal
      v-if="mergeModalValue"
      v-bind="mergeModalValue"
      :sId="sId"
      @close="mergeModalValue = null"
      @merged="getRawData"
    />
  </v-container>
</template>

<script lang="ts">
import { IWhooingSection } from "@/models/IWhooingSection";
import {
  IWhoooingGetEntriesParams,
  WhoooingGetEntriesParams,
} from "@/models/IWhoooingGetEntriesPayload";
import { WhooingEntryModel } from "@/models/WhooingEntryModel";
import fns from "date-fns";
import { interfaces } from "mocha";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import {
  getWhooingEntries,
  IWhooingEntriesResults,
} from "../api/GetWhooingEntries";
import DuplicationGroup from "../components/DuplicationGroup.vue";
import {
  EntriesDuplicationHelper,
  IDuplicationOptions,
} from "../helpers/EntriesDuplicationHelper";
import { UserHelper } from "../store/modules/User";
import { UserModule } from "../store/store";
import { WhooingDate } from "../utils/WhooingDate";
import MergeEntriesModal from "../components/MergeEntriesModal.vue";
import { IMergeSelected } from "@/models/IMergeSelected";

@Component({
  components: {
    DuplicationGroup,
    MergeEntriesModal,
  },
})
export default class CheckDuplication extends Vue {
  public mergeModalValue: {
    mergeSelected: IMergeSelected;
    entryIds: number[];
  } | null = null;

  // computed
  /** 섹션 리스트 */
  get sections(): IWhooingSection[] {
    return UserModule.sectionList;
  }

  /** 섹션 Id */
  get sId(): string {
    if (this.$route.query && this.$route.query.sId) {
      return this.$route.query.sId as string;
    } else {
      const sId = this.sections[0].section_id;
      this.sId = sId;
      return sId;
    }
  }
  /** 섹션 Id */
  set sId(v) {
    this.$router.replace({
      name: this.$route.name,
      query: { sId: v },
    });
  }
  get sIdName() {
    return UserHelper.GetSectionName(this.sId);
  }
  // data
  public searchForm: ISearchForm = this.createSearchForm();
  public duplicationOptions: IDuplicationOptions = this.createDuplicateOptions();

  public menu = {
    startDate: false,
    endDate: false,
  };
  public state = {
    isLoadingRawData: false,
  };
  public rawData: WhooingEntryModel[] = [];
  public duplicatData: { [index: string]: WhooingEntryModel[] } = {};

  // watch
  @Watch("duplicationOptions", { deep: true })
  public onDuplicationOptions() {
    // console.log("onDuplicationOptions");
    this.duplicatData = this.getDuplicatData(this.rawData);
  }

  // methods
  public clearSearchForm() {
    this.searchForm = this.createSearchForm();
    this.duplicationOptions = this.createDuplicateOptions();
  }

  public getDuplicatData(
    rawData = this.rawData,
  ): { [index: string]: WhooingEntryModel[] } {
    if (rawData.length < 1) {
      return {};
    }
    const duplicationList = EntriesDuplicationHelper.duplicateEntries(
      rawData,
      this.duplicationOptions,
    );

    const result: { [index: string]: WhooingEntryModel[] } = {};
    for (const key of Object.keys(duplicationList)) {
      const item = duplicationList[key];
      if (item.length > 1) {
        result[key] = item;
      }
    }
    return result;
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
      if(result.length >= 5000){
        break;
      }
    }
    if (this.rawData === result) {
      this.duplicatData = this.getDuplicatData(this.rawData);
    }
    this.state.isLoadingRawData = false;
  }

  public mounted() {
    this.getRawData();
  }

  // 거래불러오기 조건 설정
  private createGetRawDataParams(): WhoooingGetEntriesParams {
    const params = new WhoooingGetEntriesParams(this.sId);
    params.start_date = WhooingDate.ConvertNumber(
      new Date(this.searchForm.startDate),
    );
    params.end_date = WhooingDate.ConvertNumber(
      new Date(this.searchForm.endDate),
    );

    return params;
  }

  // 검색조건 초기화
  private createSearchForm(): ISearchForm {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth());
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return {
      startDate: fns.format(startDate, "YYYY-MM-DD"),
      endDate: fns.format(endDate, "YYYY-MM-DD"),
    };
  }

  // 중복검색조건 초기화
  private createDuplicateOptions(): IDuplicationOptions {
    const duplicationOptions: IDuplicationOptions = {
      isSameMoney: false,
      isSameItem: false,
      isSameLeft: false,
      isSameRight: true,
      isSameDate: true,
    };
    return duplicationOptions;
  }
}

interface ISearchForm {
  startDate: string;
  endDate: string;
}
</script>