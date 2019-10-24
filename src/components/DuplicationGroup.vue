<template>
  <v-card class="mb-1">
    <v-card-title>
      <v-chip class="mx-2" label v-if="keyObject.date">{{keyObject.date | dateToString}}</v-chip>
      <v-chip class="mx-2" label v-if="keyObject.item">{{keyObject.item}}</v-chip>
      <v-chip class="mx-2" label v-if="keyObject.money">{{keyObject.money}}</v-chip>
      <v-chip class="mx-2" label v-if="keyObject.left || keyObject.right">
        <span>{{keyObject.left | accountLabel(sId, "(All)") }}</span>
        ← {{keyObject.right | accountLabel(sId, "(All)")}}
      </v-chip>
    </v-card-title>
    <v-card-text>
      <v-layout row wrap v-for="item in value.data" :key="item.entry_id">
        <v-flex>{{item.entry_date | whooingDate | dateToString}}</v-flex>
        <v-flex>{{item.item}}</v-flex>
        <v-flex>{{item.money}}</v-flex>
        <v-flex>{{item.l_account_id| accountLabel(sId)}}</v-flex>
        <v-flex>{{item.r_account_id| accountLabel(sId)}}</v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { WhooingEntryModel } from "@/models/WhooingEntryModel";
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  EntriesDuplicationHelper,
  IKeyObject,
} from "../helpers/EntriesDuplicationHelper";
import { UserHelper } from "../store/modules/User";

interface IDuplicationGroupModel {
  key: string;
  data: WhooingEntryModel[];
}

@Component
export default class DuplicationGroup extends Vue {
  @Prop({ type: Object, required: true })
  public value!: IDuplicationGroupModel;

  @Prop({ type: String, required: true })
  public sId!: string;

  public get keyObject(): IKeyObject {
    return EntriesDuplicationHelper.parseKey(this.value.key);
  }

  public get keyTags(): string[] {
    return [];
  }
}
</script>