<template>
  <v-dialog :value="true" persistent max-width="600">
    <v-card>
      <v-card-title class="headline primary py-1 white--text">병합 확인</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p>
          {{entryIds.length}}건의 거래를 아래와 같이 병합하시겠습니까?
          <br />
        </p>
        <div>
          <v-chip class="mx-1">{{mergeSelected.date | dateToString}}</v-chip>
          <v-chip class="mx-1">{{mergeSelected.item}}</v-chip>
          <v-chip class="mx-1">{{mergeSelected.money}}</v-chip>
          <v-chip class="mx-1">{{mergeSelected.left | accountLabel(sId)}}</v-chip>
          <v-chip class="mx-1">{{mergeSelected.right | accountLabel(sId)}}</v-chip>
          <v-chip class="mx-1" label v-if="mergeSelected.memo">{{mergeSelected.memo}}</v-chip>
        </div>
      </v-card-text>
      <v-progress-linear v-if="isMerging" :indeterminate="true"></v-progress-linear>
      <v-card-actions v-else>
        <v-btn color="primary" @click="merge">병합</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="$emit('close')">close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IMergeSelected } from "../models/IMergeSelected";
import { EntriesInputHelper } from "../helpers/EntriesInputHelper";
import { WhooingDate } from "../utils/WhooingDate";
import { DeleteWhooingEntries } from "../api/DeleteWhooingEntries";

@Component
export default class MergeEntriesModal extends Vue {
  /** 병합선택 항목 */
  @Prop({ type: Object, required: true })
  public mergeSelected!: IMergeSelected;

  /** 병합될 거래내역 */
  @Prop({ type: Array, required: true })
  public entryIds!: number[];

  /** 섹션Id */
  @Prop({ type: String, required: true })
  public sId!: string;

  /** 머지 진행중 */
  public isMerging: boolean = false;

  public errorMessage: string = "";

  private async merge() {
    this.isMerging = true;
    const date = WhooingDate.ParseNumber(Number(this.mergeSelected.date));
    const input = { ...this.mergeSelected, sId: this.sId, date };
    try {
      // 거래 추가
      await EntriesInputHelper.PushEntryAsync(input);
      // 거래 삭제
      await DeleteWhooingEntries(this.entryIds);
      this.$emit("merged");
      this.$emit("close");
    } catch (err) {
      this.isMerging = false;
      this.errorMessage = "병합에 실패했습니다.";
    }
  }
}
</script>