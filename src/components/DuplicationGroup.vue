<template>
  <v-hover>
    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2} mb-2`">
      <v-card-title>
        <v-chip class="mx-2" label v-if="keyObject.date">{{keyObject.date | dateToString}}</v-chip>
        <v-chip class="mx-2" label v-if="keyObject.item">{{keyObject.item}}</v-chip>
        <v-chip class="mx-2" label v-if="keyObject.money">{{keyObject.money}}</v-chip>
        <v-chip class="mx-2" label v-if="keyObject.left || keyObject.right">
          <span>{{keyObject.left | accountLabel(sId, "(All)") }}</span>
          ← {{keyObject.right | accountLabel(sId, "(All)")}}
        </v-chip>
        <v-spacer></v-spacer>
        <v-btn v-if="selectedIds.length === 0" @click="selectAll">전체선택</v-btn>
        <v-btn v-else @click="selectedIds = []">선택해제</v-btn>
        <v-btn :disabled="selectedIds.length < 2" color="primary" @click="merge">병합</v-btn>
      </v-card-title>
      <v-card-text>
        <div v-for="(item, item_i) in value.data" :key="item.entry_id">
          <v-divider v-if="item_i > 0" class="mb-2"></v-divider>
          <v-layout row wrap justify-space-between style="min-height: 45px;">
            <v-flex xs1 order-sm1>
              <v-checkbox v-model="selectedIds" :value="item.entry_id" class="ma-0" hide-details></v-checkbox>
            </v-flex>
            <v-flex xs3 sm2 order-sm2 class="pr-2">
              <v-btn
                v-if="selectedIds.includes(item.entry_id)"
                :color="item.entry_date.split('.')[0] === mergeSelected.date ? 'success':'grey'"
                block
                @click="mergeSelected.date = item.entry_date.split('.')[0]"
                class="ma-0 mb-1"
              >{{item.entry_date | whooingDate | dateToString}}</v-btn>
              <v-chip v-else class="ma-0">{{item.entry_date | whooingDate | dateToString}}</v-chip>
            </v-flex>
            <v-flex xs4 sm2 order-sm5 class="pr-2 text-xs-right">
              <v-btn
                v-if="selectedIds.includes(item.entry_id)"
                :color="item.l_account_id === mergeSelected.left ? 'success':'grey'"
                block
                @click="mergeSelected.left = item.l_account_id"
                class="ma-0 mb-1"
              >{{item.l_account_id| accountLabel(sId)}}</v-btn>
              <v-chip v-else class="ma-0 mb-1">{{item.l_account_id| accountLabel(sId)}}</v-chip>
            </v-flex>
            <v-flex xs4 sm2 order-sm6 class="pr-2 text-xs-right">
              <v-btn
                v-if="selectedIds.includes(item.entry_id)"
                :color="item.r_account_id === mergeSelected.right ? 'success':'grey'"
                block
                @click="mergeSelected.right = item.r_account_id"
                class="ma-0 mb-1"
              >{{item.r_account_id| accountLabel(sId)}}</v-btn>
              <v-chip v-else class="ma-0 mb-1">{{item.r_account_id| accountLabel(sId)}}</v-chip>
            </v-flex>
            <v-flex xs8 sm3 order-sm3 class="pr-2">
              <v-btn
                v-if="selectedIds.includes(item.entry_id)"
                :color="item.item === mergeSelected.item &&  mergeSelected.memo === item.memo ? 'success':'grey'"
                block
                @click="mergeSelected.item = item.item; mergeSelected.memo = item.memo"
                class="ma-0 mb-1"
              >{{item.item}}</v-btn>
              <v-chip v-else label class="ma-0 mb-1" style="display:block; width:100%">{{item.item}}</v-chip>
              <div class="pt-1 caption text-truncate grey--text">{{item.memo}}</div>
            </v-flex>
            <v-flex xs4 sm2 order-sm4 class="text-xs-right pr-2">
              <v-btn
                v-if="selectedIds.includes(item.entry_id)"
                :color="item.money === mergeSelected.money ? 'success':'grey'"
                block
                @click="mergeSelected.money = item.money"
                class="ma-0 mb-1 subheading xs-text-right"
              >{{item.money.toLocaleString()}}</v-btn>
              <v-chip
                v-else
                label
                class="ma-0 mb-1"
                style="display:block; width:100%"
              >{{item.money.toLocaleString()}}</v-chip>
            </v-flex>
          </v-layout>
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
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
    } else if (selectedLength === 1 || !this.mergeSelected) {
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

  public selectAll() {
    this.selectedIds = this.value.data.map((o) => o.entry_id);
  }

  public merge(){
    this.$emit("merge", this.mergeSelected, this.selectedIds)
  }
}
</script>