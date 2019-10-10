<template>
  <v-card class="mb-1">
    <v-card-title>{{keyObject}}</v-card-title>
    <v-card-text>
      <v-layout row wrap v-for="item in value.data" :key="item.entry_id">
        <v-flex>{{item.entry_date}}</v-flex>
        <v-flex>{{item.item}}</v-flex>
        <v-flex>{{item.l_account_id}}</v-flex>
        <v-flex>{{item.r_account_id}}</v-flex>
        <v-flex>{{item.money}}</v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { WhooingEntryModel } from "@/models/WhooingEntryModel";
import {
  EntriesDuplicationHelper,
  IKeyObject,
} from "../helpers/EntriesDuplicationHelper";

interface IDuplicationGroupModel {
  key: string;
  data: WhooingEntryModel[];
}

@Component
export default class DuplicationGroup extends Vue {
  @Prop({ type: Object, required: true })
  public value!: IDuplicationGroupModel;

  public get keyObject(): IKeyObject {
    return EntriesDuplicationHelper.parseKey(this.value.key);
  }
}
</script>