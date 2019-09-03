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
            <v-btn color="info">
              검색
              <v-icon right>search</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import fns from "date-fns";

@Component
export default class CheckDuplication extends Vue {
  public searchForm: SearchForm = new SearchForm();
  public menu = {
    startDate: false,
    endDate: false,
  };

  public clearSearchForm() {
    this.searchForm = new SearchForm();
  }
}

class SearchForm {
  startDate: string;
  endDate: string;
  isSameMoney: boolean = true;
  isSameItem: boolean = false;
  isSameLeft: boolean = false;
  isSameRight: boolean = true;
  isSameDate: boolean = false;
  constructor() {
    const today = new Date();
    const starDate = new Date(today.getFullYear(), today.getMonth());
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.startDate = fns.format(starDate, "YYYY-MM-DD");
    this.endDate = fns.format(endDate, "YYYY-MM-DD");
  }
}
</script>