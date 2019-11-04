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
      <v-spacer></v-spacer>
      <v-btn>병합</v-btn>
    </v-card-title>
    <v-card-text>
      <v-layout row wrap v-for="item in value.data" :key="item.entry_id" justify-space-between>
        <v-flex xs1>
          <v-checkbox v-model="selectedIds" :value="item.entry_id" class="ma-0"></v-checkbox>
        </v-flex>
        <v-flex xs3 sm2>
          <v-radio-group
            v-if="selectedIds.includes(item.entry_id)"
            v-model="mergeSelected.date"
            class="ma-0"
          >
            <v-radio
              :value="item.entry_date.split('.')[0]"
              :success="item.entry_date.split('.')[0]===mergeSelected.date"
              color="success"
            >
              <div slot="label">{{item.entry_date | whooingDate | dateToString}}</div>
            </v-radio>
          </v-radio-group>
          <template v-else>{{item.entry_date | whooingDate | dateToString}}</template>
        </v-flex>
        <v-flex xs4 sm3>{{item.item}}</v-flex>
        <v-flex xs3 sm2 class="text-xs-right pr-2">{{item.money}}</v-flex>
        <v-flex xs4 sm2 offset-xs3 offset-sm0>{{item.l_account_id| accountLabel(sId)}}</v-flex>
        <v-flex xs4 sm2>{{item.r_account_id| accountLabel(sId)}}</v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { WhooingEntryModel } from "@/models/WhooingEntryModel";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import {
  EntriesDuplicationHelper,
  IKeyObject,
} from "../helpers/EntriesDuplicationHelper";
import { UserHelper } from "../store/modules/User";

interface IDuplicationGroupModel {
  key: string;
  data: WhooingEntryModel[];
}

interface IMergeSelected {
  date: string;
  item: string;
  memo: string;
  money: string;
  left: string;
  right: string;
}

@Component
export default class DuplicationGroup extends Vue {
  @Prop({ type: Object, required: true })
  public value!: IDuplicationGroupModel;

  @Prop({ type: String, required: true })
  public sId!: string;

  public selectedIds: number[] = [];

  public mergeSelected: IMergeSelected | null = null;

  public get keyObject(): IKeyObject {
    return EntriesDuplicationHelper.parseKey(this.value.key);
  }

  public get keyTags(): string[] {
    return [];
  }

  @Watch("selectedIds")
  public onSelectedIds() {
    const selectedLength = this.selectedIds.length;
    if (selectedLength === 0) {
      this.mergeSelected = null;
    } else if (selectedLength === 1) {
      const selectedItem = this.value.data.find(
        (o) => o.entry_id === this.selectedIds[0],
      );
      if (selectedItem) {
        this.mergeSelected = {
          date: selectedItem.entry_date.split(".")[0],
          item: selectedItem.item,
          memo: selectedItem.memo,
          money: selectedItem.money,
          left: selectedItem.l_account_id,
          right: selectedItem.r_account_id,
        };
      }
    }
  }
}
</script>